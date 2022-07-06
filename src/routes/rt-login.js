const express = require("express");

const LoginController = require("../../src/controllers/authentication/loginController.js");


const router = express.Router();

// Firebase
router.post("/email", LoginController.createAccountByEmailController);
router.post("/google", LoginController.createAccountByGoogleController);

// MongoDB

router.post("/register", LoginController.createAccountMongoDBController);

router.post("/login", LoginController.loginAccountMongoController);





module.exports = router;