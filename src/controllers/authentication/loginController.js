const LoginServices = require("../../services/authentication/loginService.js");

const LoginController = {};


LoginController.createAccountController= async (req, res) => {
    try {
      const userParam = await LoginServices.createAccountService(req);
      res.status(200).json({
        userAccount: "hello",
        message: "Success",
      });
    } catch (error) {}
  };


module.exports = LoginController;
