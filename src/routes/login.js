const express = require("express");

const LoginController = require("../../src/controllers/authentication/loginController.js");


const router = express.Router();

router.get("/", LoginController.createAccountController);






module.exports = router;