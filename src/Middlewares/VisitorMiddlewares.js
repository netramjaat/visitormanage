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



/*
const jwt = require('jsonwebtoken');
const Admin = require('../Models/AdminModel'); // Import the Admin model
require('dotenv').config();

module.exports.adminVerification = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ status: false, message: 'Authentication required' });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false, message: 'Invalid token' });
    }

    // Check if the user is an admin
    const admin = await Admin.findById(data.id);
    if (!admin) {
      return res.status(401).json({ status: false, message: 'Admin not found' });
    }

    // Verify that the user is an admin for the /visitor/previous route
    if (req.originalUrl === '/visitor/previous' || req.originalUrl === '/visitor/current' ) {
      // Additional check to ensure admin access for /visitor/previous
      if (admin.isAdmin) {
        req.admin = admin; // Attach the admin object to the request for further processing
        //return next();
      } else {
        return res.status(403).json({ status: false, message: 'Admin access required for this route' });
      }
    } else {
      next(); // Continue to the next middleware or route for other routes
    }
  });
};

*/