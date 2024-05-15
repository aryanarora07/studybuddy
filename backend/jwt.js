const jwt = require('jsonwebtoken');
require("dotenv").config();


const jwtAuthMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization;
    if(!authorization) return res.status(500).json({error: "token not found"})
 
    //Extracting the token from the request headers 
    const token = req.headers.authorization.split(' ')[1];


    

    try {
        if(!token){ // if token not found
            // return res.status(401).json({error: "Unauthorized"});
            res.redirect('/login')
        }
        // verifying the token
        const decoded = jwt.verify(token, process.env.jwtsecret) // returns the payload which was used to create jwt in the first place

        req.user = decoded; // sending the user info to the routes we want to be protected so that they can be accessed
        next();
        // in place of req.user u can put anything like req.jwtPayload etc
        // bas jo request server me aage jaa rha h usme ham nya key add kr dete hain to send user info

    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Invalid Token"})
    }
}


// function to gen jwt token
const generateToken = (userData) => {

    return jwt.sign(userData, process.env.jwtsecret, {expiresIn: '24h'}); // taking payload and secret key as param
}

module.exports = {jwtAuthMiddleware, generateToken};