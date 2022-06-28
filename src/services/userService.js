import moduleName from "../models/user.json" assert { type: "json" };
import { v4 as uuidv4 } from "uuid"; // Render Id type Guid
// import data from "../config/config.js";
import db from "../config/config.js";
// getAll
export const getAllUserSevice = () => {
  const data = db.collection("users");

  console.log("data la", data);
  if (data.empty) {
    console.log(data);
    return -1;
  } else return data;
};

// create

export const createUserSevice = (req) => {
  const user = req.body;
  const userId = uuidv4();

  const userWithId = { ...user, id: userId };

  User.add(user);

  return userId;
};

// update
export const updateUserSerivce = (req) => {
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
export const deleteUserService = (req) => {
  const { id } = req.params;
  debugger;
  const filterIdUsers = moduleName.filter((user) => user.id !== id);

  return filterIdUsers;
};

// Xem chi tiết
export const getUserbyIdService = (req) => {
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
};
