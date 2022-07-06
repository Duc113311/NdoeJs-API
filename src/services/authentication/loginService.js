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
 * Create Account Mongo
 * @param {*} req
 * @param {*} res
 * @returns
 */
LoginServices.createAccountMongoDBService = async (req, res) => {
  const userName = req.body.userName;
  const passWord = req.body.passWord;

  if (userName === undefined || passWord === undefined) {
    return undefined;
  }

  let exsistData = await dbMongo.collection("Accounts").findOne({
    UserName: userName,
  });

  if (exsistData) {
    return exsistData.UserName;
  } else {
    let insertData = await dbMongo.collection("Accounts").insert({
      UserName: userName,
      PassWord: passWord,
    });
    return insertData;
  }
};

LoginServices.loginAccountMongoService = async (req, res) => {
  const dataBody = req.body;

  const accessToken = jwt.sign(dataBody, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });

  return accessToken;
};



module.exports = LoginServices;
