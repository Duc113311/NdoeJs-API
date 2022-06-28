
import moduleName from "../models/user.json" assert { type: "json" };
import { v4 as uuidv4 } from "uuid"; // Render Id type Guid
import User from "../config/config.js";

// getAll
export const getAllUserSevice = () => {
  return User;
};

// create

export const createUserSevice = (req) => {
  const user = req.body;
  const userId = uuidv4();

  debugger
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

  const filterIdUser = moduleName.find((user) => user.id === id);

  return filterIdUser;
};
