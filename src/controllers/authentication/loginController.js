const LoginServices = require("../../services/authentication/loginService.js");

const LoginController = {};

LoginController.createAccountByEmailController = async (req, res) => {
  try {
    const userParam = await LoginServices.createAccountByEmailService(req);
    console.log("user", userParam);
    res.status(200).json({
      userAccount: userParam,
      message: "Success",
    });
  } catch (error) {}
};

LoginController.createAccountByGoogleController = async (req, res) => {
  try {
    console.log("Success");
    console.log(req);
    const userParam = await LoginServices.createAccountByGoogleService(req);
    // console.log("user", userParam);
    res.status(200).json({
      userAccount: [],
      message: "Success",
    });
  } catch (error) {}
};

module.exports = LoginController;
