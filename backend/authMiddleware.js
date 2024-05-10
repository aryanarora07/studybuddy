// authMiddleware.js

const jwt = require('jsonwebtoken');

const jwtSecret = "abcd";

const authMiddleware = (req, res, next) => {
  // Check if token exists in cookies
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // Token verification failed, redirect to login page
        res.redirect('/login');
      } else {
        // Token is valid, user is logged in
        next(); // Proceed to next middleware
      }
    });
  } else {
    // No token found, redirect to login page
    res.redirect('/login');
  }
};

module.exports = authMiddleware;
