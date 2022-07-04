const express = require("express");

const LoginController = require("../../src/controllers/authentication/loginController.js");


const router = express.Router();

router.post("/email", LoginController.createAccountByEmailController);
router.post("/google", LoginController.createAccountByGoogleController);







module.exports = router;