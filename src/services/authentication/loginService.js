const authjwt = require("../../config/config.js");

const LoginServices = {};

LoginServices.createAccountService = async (req) => {
  const auths = authjwt.auth;
  const email = req.body.email;
  const password = req.body.password;
  console.log("ádasd", password);
  await auths
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    //   console.log("success", user);
      return user;
    })
    .catch((error) => {
      return error;
    });
};

module.exports = LoginServices;
