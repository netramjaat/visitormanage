const mongoose = require('mongoose');

// Define a schema for the second dataset 
const studentVisitorSchema = new mongoose.Schema({
  date: { type: Date},
  name: { type: String},
  mobileNo: { type: String },
  address: { type: String },
  studentName: { type: String },
  studentMobileNo: { type: String },
  department: { type: String},
  hostelRoomNo: { type: String  },
  inTime: { type: String },
  outTime: { type: String },
  timestamp: { type: Number },
  datetime: {type: Date} , 
});

// Create a Mongoose model for the Student related visitors data
const studentVisitor= mongoose.model('studentVisitor', studentVisitorSchema);

module.exports = studentVisitor;
