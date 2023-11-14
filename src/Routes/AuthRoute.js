/*
const { Signup, Login } = require('../Controllers/AuthController')
const router = require('express').Router()
const {userVerification} = require('../Middlewares/AuthMiddlewares')
router.post('/signup', Signup)
router.post('/login', Login)
router.post('/',userVerification)

module.exports = router
*/
const express = require('express');
const router = express.Router();
const userAuthController = require('../Controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddlewares');

router.post('/signup', userAuthController.Signup);
router.post('/login', userAuthController.Login);
router.post('/', userVerification);

module.exports = router;
