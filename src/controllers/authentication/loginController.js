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

/**
 * Login account
 * @param {*} req
 * @param {*} res
 */
LoginController.loginAccountMongoController = async (req, res) => {
  try {
    //
    const refreshToken = await LoginServices.loginAccountMongoService(req);
    if (refreshToken) {
      res.status(200).json({ refreshToken });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    //
    res.sendStatus(500);
  }
};

LoginController.loginPhoneNumberController = async (req, res) => {
  try {
    //
    const sentCodeId = await LoginServices.loginPhoneNumberService(req);
    if(sentCodeId){
      res
      .status(200)
      .json({ message: "Send codeId success", codeId: sentCodeId });
    }else{
      res
      .status(401)
      .json({ message: "Error codeId", codeId: sentCodeId });
    }
    
  } catch (error) {
    //
    res.sendStatus(500);
  }
};

module.exports = LoginController;
