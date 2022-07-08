const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const authjwt = require("../../config/config.js");
const dbMongo = require("../../database/dataHeartlinkMongo.js");
const LoginServices = {};
/**
 * Tạo tài khoản bằng email vs password
 * @param {*} req
 */
LoginServices.createAccountByEmailService = async (req) => {
  const auths = authjwt.auth;
  const email = req.body.email;
  const password = req.body.password;
  await auths
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return error;
    });
};

/**
 * Login Google
 * @param {*} req
 */
LoginServices.createAccountByGoogleService = async (req) => {
  const auths = authjwt.auth;
  const provider = authjwt.provider;
  await auths
    .signInWithPopup(auth, provider)
    .then((result) => {
      const credential = auths.GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return user;
      // ...
    })
    .catch((error) => {
      return error;
    });
};

/**
 * Create Account Firebase
 * @param {*} req
 * @param {*} res
 * @returns
 */
LoginServices.createAccountMongoDBService = async (req, res) => {
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  const entityBody = req.body;

  if (userName === undefined || passWord === undefined) {
    return undefined;
  }

  // Tìm kiếm xem tồn tại tài khoản này chưa
  const accountDb = authjwt.db.collection("Accounts");
  await accountDb.add(entityBody);

  return entityBody;
};

/**
 * Login bằng nhập tài khoản & mật khẩu
 * @param {*} req
 * @param {*} res
 * @returns
 */
LoginServices.loginAccountMongoService = async (req, res) => {
  const dataBody = req.body;
  const refreshTokenDB = authjwt.db.collection("RefreshTokens");

  // Kiểm tra xem đúng tài khoản & mật khẩu chưa
  const accountParamDB = authjwt.db
    .collection("Accounts")
    .where("userName", "==", dataBody.userName)
    .where("passWord", "==", dataBody.passWord);

  accountParamDB.get().then(async (doc) => {
    if (doc.empty) {
      return {};
    } else {
      console.log("Data", true);

      const accessToken = jwt.sign(dataBody, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30s",
      });

      const refershTokenParam = jwt.sign(
        dataBody,
        process.env.REFRESH_TOKEN_SECRET
      );
      const refreshToken = {
        userName: dataBody.userName,
        refreshTokenValue: refershTokenParam,
        accessTokenValue: accessToken,
      };

      await refreshTokenDB.add(refreshToken);
      return refreshToken;
    }
  });
};

LoginServices.loginPhoneNumberService = async (req, res) => {
  const phoneNumberParam = req.body.phoneNumber;
  const verificationCode = req.body.codeId;
  const verificationId = req.body.sendCodeId;

  const auths = authjwt.auth;
  const credential = await authjwt.authBase.PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );
  try {
    await auths.signInWithCredential(credential).then((result) => {
      debugger;
      console.log("Kết quả", result);
      return result;
    });
  } catch (error) {
    console.log("Lỗi", error);
  }
};

module.exports = LoginServices;
