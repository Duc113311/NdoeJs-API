const { v4: uuidv4 } = require("uuid");
const User = require("../config/config.js");
const db = require("../config/config.js");

const UserService = {};
// getAll
UserService.getAllUserSevice = async () => {
  const User = db.collection("User");
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(list);
  return list;
};

// create

UserService.createUserSevice = async(req) => {
  const user = req.body;
  const User = db.collection("User");
  await User.add(user);
  // console.log("Luu",User)

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
  console.log(id);
  const docRef = db.collection("users").doc(id);
  console.log(docRef);
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
