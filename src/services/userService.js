const { v4: uuidv4 } = require("uuid");
const User = require("../config/config.js");
const authjwt = require("../config/config.js");

const UserService = {};
// getAll
UserService.getAllUserSevice = async () => {
  const User = authjwt.db.collection("User");
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return list;
};

// create

UserService.createUserSevice = async (req) => {
  const user = req.body;
  const User = db.collection("User");
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
