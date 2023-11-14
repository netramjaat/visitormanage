const express = require('express');
const router = express.Router();
const adminAuthController = require('../Controllers/AdminAuthController'); // Create this admin controller if not already done
const { adminVerification } = require('../Middlewares/AdminAuthMiddlewares');


router.post('/', adminVerification);
router.post('/signup', adminAuthController.adminSignup);
router.post('/login', adminAuthController.adminLogin);
// visitorRoutes.js


// Add middleware for admin authentication if needed

//router.post('/add-visitor', adminAuthController.addVisitor);
//router.post('/add-student-visitor', adminAuthController.addStudentVisitor)
module.exports = router;
