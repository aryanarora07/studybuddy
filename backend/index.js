const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const { jwtAuthMiddleware, generateToken } = require("./jwt");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const port = 4000;

const UserModel = require("./models/users");
const UserInfo = require("./models/userInfo");


app.get("/", (_, res) => {
  res.send("Welcome to the backend of Study Buddy");
});

async function connectToDatabase () {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Succesfully connected to DB");

  } catch (error) {
    console.log("error: " + error)
  }
}
connectToDatabase();

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body; // Destructure the required fields

    // Check if all required fields are present
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUser = await UserModel.create(req.body); // Create a new user
    await UserInfo.create({ email: newUser.email, major: "", year: 0 });

    console.log("Successfully created user in db:", newUser);

    const payload = {
      id: newUser._id,
      email: req.body.email,
    };

    const token = generateToken(payload); // Generate JWT token
    res.status(200).json({ response: req.body, token: token, id: newUser._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      if (user.password === password) {
        const payload = {
          id: user._id,
          email: user.email
        };

        const token = generateToken(payload);
        console.log("token  " + token);

        const userInfo = await UserInfo.findOne({ email });
        const redirectTo = userInfo && userInfo.major && userInfo.year ? "/home" : "/profile";

        const responsePayload = {token, redirectTo};

        // Send token to frontend for verification
        res.status(200).json(responsePayload);

        // const userInfo = await UserInfo.findOne({ email });

        // if (userInfo && userInfo.major && userInfo.year) {
        //   // Major and year exist, redirect to home page
        //   return res.status(200).json({ redirectTo: "/home" });
        // } else {
        //   // Major and year don't exist, redirect to profile page
        //   return res.status(200).json({ redirectTo: "/profile" });
        // }
      } else {
        console.log("The password is incorrect");
      }
    } else {
      console.log("User not found. You need to sign up.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});



app.post("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const { major, year } = req.body;
    const userEmail = req.user.email; // Extract email from the authenticated user

    const userInfo = await UserInfo.findOneAndUpdate(
      { email: userEmail }, // Query by email
      { major, year }, // Update with provided major and year
      { new: true, upsert: true, setDefaultsOnInsert: true } // Options to create if not exists and set defaults
    );

    console.log("user info added: ", userInfo);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create userInfo" });
  }
});


app.get('/profile', jwtAuthMiddleware, async (req, res)=>{
  try {
    const userData = req.user;
    // console.log("user data is: " + userData); 

    const userEmail = userData.email;

    const user = await UserModel.findOne({email:userEmail});
    // console.log(user)
    res.status(200).json({user})


  } 

  catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal Server Error"})
  }
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
