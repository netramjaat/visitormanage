// visitorController.js

const Visitor = require('../Models/VisitorsModel'); // Import the Mongoose schema
const studentVisitor = require('../Models/StudentVisitor'); // Import the Mongoose model

module.exports.addVisitor = async (req, res) => {
  try {
    const {
      date,
      name,
      mobileNo,
      comingFrom,
      vehicleNo,
      whomToMeet,
      inTime, // String format: "hh:mm AM/PM"
      outTime, // String format: "hh:mm AM/PM"
    } = req.body;

    // Create a new visitor record with the input data
    const newVisitor = new Visitor({
      date,
      name,
      mobileNo,
      comingFrom,
      vehicleNo,
      whomToMeet,
      inTime,
      outTime,
    });

    // Save the new visitor record to the database
    await newVisitor.save();

    res.status(201).json({ message: 'Visitor added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding visitor', error: error.message });
  }
};


module.exports.addStudentVisitor = async (req, res) => {
  try {
    const {
      date,
      name,
      mobileNo,
      address,
      studentName,
      studentMobileNo,
      department, 
      hostelRoomNo , 
      inTime, // String format: "hh:mm AM/PM"
      outTime, // String format: "hh:mm AM/PM"
    } = req.body;

    // Create a new visitor record with the input data
    const newStdVisitor = new studentVisitor({
      date,
      name,
      mobileNo,
      address,
      studentName,
      studentMobileNo,
      department, 
      hostelRoomNo , 
      inTime, // String format: "hh:mm AM/PM"
      outTime
    });

    // Save the new visitor record to the database
    await newStdVisitor.save();

    res.status(201).json({ message: 'Student  Visitor added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding visitor', error: error.message });
  }
};









/*
module.exports.addVisitor = async (req, res) => {
  try {
    // Create a new visitor record based on the request data
    const newVisitor = new DataDisplay1(req.body);

    // Save the new visitor record to the database
    await newVisitor.save();

    res.status(201).json({ message: 'Visitor added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding visitor', error: error.message });
  }
};

module.exports.addStudentVisitor = async(req, res)=>{
  try{
    const newStudentVisitor = new DataDisplay2(req.body) ; 
    await newStudentVisitor.save() ; 
    res.status(201).json({message: 'Students Related Visitor added successfully'}) ; 
  }
  catch(error){
    res.status(500).json({message: 'Error adding Student-visitor', error: error.message}) ; 
  }
};

*/