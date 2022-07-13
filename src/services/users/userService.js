const { v4: uuidv4 } = require("uuid");
const User = require("../../config/config.js");
const authjwt = require("../../config/config.js");
const jwt = require("jsonwebtoken");
const UserService = {};
// getAll
UserService.getAllUserSevice = async (req, res, next) => {
  const authen = await authenToken(req, res);
  if (!authen) {
    return authen;
  } else {
    if (!authen.data) {
      return authen;
    } else {
      const User = authjwt.db.collection("Users");
      const snapshot = await User.get();
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return list;
    }
  }
};

function authenToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  console.log("authorizationHeader", authorizationHeader);

  const token = authorizationHeader.split(" ")[1];
  console.log("token", token);

  // error 401 Ko có quyền , thiếu Token
  if (!token) return token;

  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return { err, data, status: 403 }; // Accesstoken sai
    return data; // True
  });
}

// create

UserService.zcreateUserSevice = async (req) => {
  const user = req.body;
  const User = authjwt.db.collection("Users");
  await User.add(user);

  return user;
};

// update
UserService.updateUserSerivce = (req) => {
  const { id } = req.params;

  const { firstName, lastName, age } = req.body;

  const user = moduleName.find((user) => user.id === id);

  if (firstName) {
    user.firstName = firstName;
  }

  if (lastName) {
    user.lastName = lastName;
  }

  if (age) {
    user.age = age;
  }

  return user;
};

// Delete
UserService.deleteUserService = (req) => {
  const { id } = req.params;
  debugger;
  const filterIdUsers = moduleName.filter((user) => user.id !== id);

  return filterIdUsers;
};

// Xem chi tiết
UserService.getUserbyIdService = (req) => {
  const { id } = req.params;
  const docRef = db.collection("users").doc(id);
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return "Error";
      }
    })
    .catch((error) => {
      return error;
    });
  ``;
};

module.exports = UserService;
