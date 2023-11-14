

const express = require('express');
const router = express.Router();
const Visitor = require('../Models/VisitorsModel'); // Import the Visitor model
const { adminVerification } = require('../Middlewares/VisitorMiddlewares'); // Import the admin cookie verification middleware

const studentVisitor = require('../Models/StudentVisitor'); // Import the Visitor model

const visitor = require('../Controllers/Visitors'); // Create this admin controller if not already done

// Visitor registration route, no admin authentication needed
router.post('/add-visitor', visitor.addVisitor);
router.post('/add-student-visitor', visitor.addStudentVisitor);

  
// Middleware to verify admin cookie - Applied only to routes that require admin authentication
//router.use(adminVerification);

// Get current visitors - Requires admin authentication
router.get('/current', async (req, res) => {
  try {
    const currentVisitors = await Visitor.find({ outTime: '' }); // Visitors with no outTime
    res.json(currentVisitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get previous visitors - Requires admin authentication
router.get('/previous', async (req, res) => {
  try {
    const previousVisitors = await Visitor.find({ outTime: { $ne: '' } }); // Visitors with outTime
    res.json(previousVisitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current visitors - Requires admin authentication
router.get('/student-current', async (req, res) => {
  try {
    const currentStudentVisitors = await studentVisitor.find({ outTime: '' }); // Visitors with no outTime
    res.json(currentStudentVisitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get previous visitors - Requires admin authentication
router.get('/student-previous', async (req, res) => {
  try {
    const previousStudentVisitors = await studentVisitor.find({ outTime: { $ne: '' } }); // Visitors with outTime
    res.json(previousStudentVisitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Import required modules


// Define the route for visitor checkout

router.put('/checkout/:visitorId', async (req, res) => {
  try {
    const { visitorId } = req.params;

    // Find the visitor in the database by ID
    const visitor = await Visitor.findById(visitorId);
    const stdVisitor = await studentVisitor.findById(visitorId) ; 
    if (!(visitor || stdVisitor)) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    // Get the current date and time
    const currentDateTime = new Date();
    const outTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update the visitor's outTime
    if(visitor){
      visitor.outTime = outTime;
      await visitor.save();
    }

    if(stdVisitor) {
      stdVisitor.outTime = outTime;
      await stdVisitor.save();
    }
    // Save the changes to the database
    res.status(200).json({ message: 'Visitor checked out successfully', visitor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking out visitor', error: error.message });
  }
});



module.exports = router;

/*
// Get previous visitors - Requires admin authentication
router.get('/previous', adminVerification, async (req, res) => {
  try {
    const previousVisitors = await Visitor.find({ outTime: { $ne: null } }); // Visitors with outTime
    res.json(previousVisitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
*/
// Your other visitor routes
// ...

/*const express = require('express');
const router = express.Router();
const visitor = require('../Controllers/Visitors'); // Create this admin controller if not already done


router.post('/add-visitor', visitor.addVisitor);
//router.post('/add-student-visitor', visitor.addStudentVisitor)
// routes/visitorRoutes.js
const Visitor = require('../Models/VisitorsModel'); // Import the Visitor model

// Get current visitors
router.get('/current', async (req, res) => {
  try {
    const currentVisitors = await Visitor.find({ outTime: null }); // Visitors with no outTime
    res.json(currentVisitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get previous visitors
router.get('/previous', async (req, res) => {
  try {
    const previousVisitors = await Visitor.find({ outTime: { $ne: null } }); // Visitors with outTime
    res.json(previousVisitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

*/
// routes/visitorRoutes.js
/*
const express = require('express');
const router = express.Router();
const Visitor = require('../Models/VisitorsModel'); // Import the Visitor model
const { verifyAdminCookie } = require('../Middlewares/AdminAuthMiddlewares'); // Import the admin cookie verification middleware

const visitor = require('../Controllers/Visitors'); // Create this admin controller if not already done
router.post('/add-visitor', visitor.addVisitor);
// Middleware to verify admin cookie
router.use(verifyAdminCookie);

// Get current visitors
router.get('/current', async (req, res) => {
  try {
    const currentVisitors = await Visitor.find({ outTime: null }); // Visitors with no outTime
    res.json(currentVisitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get previous visitors
router.get('/previous', async (req, res) => {
  try {
    const previousVisitors = await Visitor.find({ outTime: { $ne: null } }); // Visitors with outTime
    res.json(previousVisitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
*/