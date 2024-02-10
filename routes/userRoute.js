const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

const userController =require('../controller/userController');

router.post ('/register',userController.register);
router.post ('/login',userController.logIn);

module.exports =router;