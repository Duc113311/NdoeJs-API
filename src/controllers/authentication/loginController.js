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

/**
 * Login PhoneNumber Firebase
 * @param {*} req
 * @param {*} res
 * CreateBy: NVDUC
 */
LoginController.loginPhoneNumberController = async (req, res) => {
  try {
    //
    const tokenParam = await LoginServices.loginPhoneNumberService(req);
    if (tokenParam) {
      res.status(200).json({ message: "Login success", tokenData: tokenParam });
    }
  } catch (error) {
    //
    res.sendStatus(500);
  }
};

/**
 * Kh???i t???o refreshToken khi accessToken h???t h???n
 * @param {*} req
 * @param {*} res
 * CreateBy: NVDuc
 */
LoginController.createRefreshTokenController = async (req, res) => {
  try {
    const refreshTokenData = await LoginServices.createRefreshTokenService(req);
    if (!refreshTokenData) {
      res.sendStatus(401);
    } else {
      res.status(200).json({
        message: "Create AccessToken Success",
        accessToken: refreshTokenData,
      });
    }
  } catch (error) {
    res.error;
  }
};

/**
 * T???o AccessToken & RefreshToken khi login th??nh c??ng
 * @param {*} req 
 * @param {*} res 
 * CreateBy: NVDuc
 */
LoginController.createTokenLoginController = async (req, res) => {
  try {
    const tokenData = await LoginServices.createRefreshTokenService(req);
    res.status(200).json({
      message: "Create AccessToken & RefreshToken Success",
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken,
    });
  } catch (error) {
    res.error;
  }
};

module.exports = LoginController;
