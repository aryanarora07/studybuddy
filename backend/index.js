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
    const newUser = await UserModel.create(req.body);
    console.log("Successfully created user in db:", newUser);

    const payload = {
      id: newUser._id,
      email: req.body.email,
    };

    const token = generateToken(payload);
    res.status(200).json({ response: req.body, token: token, id: newUser._id });
    
  } 
    catch (error) 
    {
      console.log(error);
      res.status(500).json({ error: "Failed to create user" });
    }
});

app.post("/login", (req, res) => {

  const { email, password } = req.body;  //extracting username and pwd from body by obj destructuring

  UserModel.findOne({ email: email }).then((user) => {    // finding email in db

    if (user) {                                           // if user exists
      if (user.password == password) {
        // res.json("Success");

        const payload = {   // payload for token generation
          id: user._id,
          email: user.email
        }

        const token = generateToken(payload); // generating payload

        console.log("Token generated:  " + token)

        res.status(200).json(token);  // sending token to frontend for verification
      } else {
        console.log("The pwd is incorrect");
      }
    } else {
      console.log("You need to signup");
    }
  });
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
