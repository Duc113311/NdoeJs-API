const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const authjwt = require("../../config/config.js");
const dbMongo = require("../../database/dataHeartlinkMongo.js");
const enumParam = require("../../enumeration/conmon.js");
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

/**
 * Login bằng số điện thoại Firebase
 * @param {*} req
 * @param {*} res
 * CreateBy: NVDUC - 13/07
 */
LoginServices.loginPhoneNumberService = async (req, res) => {
  const verificationCode = req.body.codeId;
  const verificationId = req.body.sendCodeId;
  const refreshTokenDB = authjwt.db.collection("RefreshTokens"); // Lấy ra bảng RefreshToken
  const accountsDB = authjwt.db.collection("Accounts"); // Lấy ra bảng Account

  const auths = authjwt.auth;
  const credential = await authjwt.authBase.PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );
  try {
    await auths.signInWithCredential(credential).then((result) => {
      const dataToken = {
        UserId: result.user.uid,
        PhoneNumber: result.user.phoneNumber,
      };
      // Tạo accessToken
      const accessToken = jwt.sign(dataToken, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "60s",
      });
      // Tạo RefreshToken
      const refershToken = jwt.sign(
        dataToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      // Lưu vào refreshToken
      const tokenParam = {
        UserId: result.user.uid,
        PhoneNumber: result.user.phoneNumber,
        AccessToken: accessToken,
        RefreshToken: refershToken,
        CreatedAt: authjwt.createBy,
        TypeAction: enumParam.TypeLogin.PhoneNumber,
      };
      refreshTokenDB.add(tokenParam);
      // Lưu trong account
      accountsDB.add(tokenParam);
      return tokenParam;
    });
  } catch (error) {
    console.log("Lỗi", error);
  }
};

/**
 * Tạo refreshToken khi accessToken hết hạn
 * @param {*} req
 * @param {*} res
 * CreteaBy: NVDuc
 */
LoginServices.createRefreshTokenService = async (req, res) => {
  const refreshToken = req.body.token;
  console.log(refreshToken);
  const refreshTokenRef = authjwt.db
    .collection("RefreshTokens")
    .doc(refreshToken);
  const refreshTokenParam = await refreshTokenRef.get();

  if (!refreshToken) return refreshToken; // Lỗi 401

  if (!refreshTokenParam.exists) {
    return refreshTokenParam; // Lỗi 403
  } else {
    return jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, data) => {
        if (err) return { err, data, status: 403 };

        console.log("dataToken", data);
        const accessToken = jwt.sign(
          { userName: data.userName },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );
        return { accessToken };
      }
    );
  }
};

/**
 * Tạo AccessToken & RefreshToken khi login thành công
 * @param {*} req
 * @param {*} res
 * CreateBy: NVDuc
 */
LoginServices.createTokenLoginService = async (req, res) => {
  const data = req.body;
  console.log({ data });
  const refreshTokenDB = authjwt.db.collection("RefreshTokens"); // Lấy ra bảng RefreshToken
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  const tokenParam = {
    UserId: result.user.uid,
    PhoneNumber: result.user.phoneNumber,
    AccessToken: accessToken,
    RefreshToken: refershToken,
    CreatedAt: authjwt.createBy,
    TypeAction: enumParam.TypeLogin.PhoneNumber,
  };
  data.AccessToken = accessToken;
  data.RefreshToken = refreshToken;
  refreshTokenDB.add(data);
  return data;
};
module.exports = LoginServices;
