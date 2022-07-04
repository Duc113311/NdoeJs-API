const authjwt = require("../../config/config.js");

const LoginServices = {};

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

LoginServices.createAccountByGoogleService = async (req) => {
  const auths = authjwt.auth;
  const provider = authjwt.provider;

  
  console.log(auths);
  console.log(provider);
  await auths.signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      const credential = auths.GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      debugger;
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log (user)
      return user
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      console.log(errorMessage);
      console.log(provider);
      console.log(errorCode);
      return error

  //     //const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
    });
};
module.exports = LoginServices;
