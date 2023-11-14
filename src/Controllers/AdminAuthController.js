const Admin = require('../Models/AdminModel'); // Replace 'AdminModel' with the actual model for admin accounts
const bcrypt = require('bcryptjs');
const { createSecretToken } = require('../util/SecretToken');

const express = require('express');
const router = express.Router();

require('dotenv').config();

module.exports.adminSignup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create a new admin account
    const admin = await Admin.create({ email, password, username, createdAt });

    // Generate a token for the newly created admin
    const token = createSecretToken(admin._id);

    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ message: 'Admin signed up successfully', success: true, admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports.adminLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid email or password, Invalid Admin' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Check if the admin is approved
      if (!admin.isApproved) {
        return res.status(401).json({ message: 'Your Admin request is not accepted yet' });
      }
  
      // Generate a token for the authenticated admin
      const token = createSecretToken(admin._id);
  
      res.cookie('token', token, {
        withCredentials: true,
        httpOnly: false,
      });
  
      res.status(200).json({ message: 'Admin logged in successfully', success: true, admin });
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  
// VisitorController.js

//const { createSecretToken } = require('../utils/tokenUtils'); // If you have token creation utility
