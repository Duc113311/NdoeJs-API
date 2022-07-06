const LoginServices = require("../../services/authentication/loginService.js");

const LoginController = {};

/**
 * Login Email Firebase
 * @param {*} req
 * @param {*} res
 */
LoginController.createAccountByEmailController = async (req, res) => {
  try {
    const userParam = await LoginServices.createAccountByEmailService(req);

    res.status(200).json({
      userAccount: userParam,
      message: "Success",
    });
  } catch (error) {}
};

/**
 * Login GG Firebase
 * @param {*} req
 * @param {*} res
 */
LoginController.createAccountByGoogleController = async (req, res) => {
  try {
    const userParam = await LoginServices.createAccountByGoogleService(req);
    res.status(200).json({
      userAccount: [],
      message: "Success",
    });
  } catch (error) {}
};

/**
 * Create Account Mongo
 * @param {*} req
 * @param {*} res
 */
LoginController.createAccountMongoDBController = async (req, res) => {
  try {
    const data = await LoginServices.createAccountMongoDBService(req);
    if (req.body.userName) {
      if (data === req.body?.userName) {
        res
          .status(404)
          .json({ status: "Account already exsits", userName: data });
      } else {
        res.status(200).json({ status: "Success", data: data });
      }
    } else {
      res.status(500).json({ status: "Account creation failed" });
    }
  } catch (error) {
    res.status(500).json({ status: "Account creation failed" });
  }
};

LoginController.loginAccountMongoController = async (req, res) => {
  try {
    //
    const accessToken = await LoginServices.loginAccountMongoService(req);
    res.status(200).json({ accessToken });
  } catch (error) {
    //
    res.sendStatus(500);
  }
};

module.exports = LoginController;
