
// visitor.js

const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  date: { type: Date },
  name: { type: String },
  mobileNo: { type: String},
  comingFrom: { type: String },
  vehicleNo: { type: String },
  whomToMeet: { type: String },
  inTime: { type: String }, // Changed type to String for time in "hh:mm AM/PM" format
  outTime: { type: String }, // Changed type to String for time in "hh:mm AM/PM" format
  timestamp: { type: Number },
  datetime : {type: Date} ,
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
