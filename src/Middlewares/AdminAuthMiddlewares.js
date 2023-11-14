const Admin = require('../Models/AdminModel'); // Replace 'AdminModel' with the actual model for admin accounts
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.adminVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false, message: 'Authentication required' });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false, message: 'Invalid token' });
    } else {
      const admin = await Admin.findById(data.id);
      if (admin) {
        req.admin = admin; // Attach the admin object to the request for further processing
        return res.json({status:true, admin:admin.username})
        //next(); // Continue to the next middleware or route
      } else {
        res.status(401).json({ status: false, message: 'Admin not found' });
      }
    }
  });
};

