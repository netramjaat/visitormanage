const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

module.exports.userVerification = async (req, res, next) => {
  const token1 = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const token2 =  req.cookies.token ; 
  let token ; 
  if(token1){
    token = token1 ; 
  }
  if(token2){
    token = token2 ; 
  }
  if (!token ){
    return res.status(401).json({ status: false, message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);

    if (user) {
      req.user = user; // Attach the user object to the request for further processing
      next();
    } else {
      return res.status(401).json({ status: false, message: 'User not found' });
    }
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Invalid token' });
  }
};

/*
const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
        const data = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await User.findById(data.id) ; 
      if (user) {
        req.user = user; // Attach the admin object to the request for further processing
        next();
      } else {
        res.status(401).json({ status: false, message: 'Admin not found' });
      }
     
    }
  })
}
*/

/*
const Admin = require('../Models/AdminModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.adminVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false, message: 'Authentication required' });
  }

  // Check if the request is to access /visitor/previous
  if (req.originalUrl === '/visitor/previous' || req.originalUrl === '/visitor/current') {
    // Verify admin cookie only for /visitor/previous route
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ status: false, message: 'Invalid token' });
      } else {
        const admin = await Admin.findById(data.id);
        if (admin) {
          req.admin = admin; // Attach the admin object to the request for further processing
          return next();
        } else {
          res.status(401).json({ status: false, message: 'Admin not found' });
        }
      }
    });
  } else {
    // Continue with the normal verification process for other routes
    jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
      if (err) {
        return res.status(401).json({ status: false, message: 'Invalid token' });
      } else {
        next(); // Continue to the next middleware or route
      }
    });
  }
};


*/
