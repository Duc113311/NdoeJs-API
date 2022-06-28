import {
  getAllUserSevice,
  createUserSevice,
  updateUserSerivce,
  deleteUserService,
  getUserbyIdService,
} from "../services/userService.js";

import { v4 as uuidv4 } from "uuid"; // Render Id type Guid
let users = [];

/**
 * Lấy all list users
 * @param {*} req
 * @param {*} res
 */
export const getAllUserController = (req, res) => {
  try {
    const data = getAllUserSevice();
    res.status(200).json({
      users: data,
    });
  } catch (error) {
    res.status(400);
  }
};

/**
 * Xem chi tiết user
 * @param {*} req
 * @param {*} res
 */
export const getUserByIdController = (req, res) => {
  try {
    const data = getUserbyIdService(req);
    res.status(200).json({
      user: data,
    });
  } catch (error) {
    res.status(400);
  }
};

/**
 * Thêm user
 * @param {*} req
 * @param {*} res
 */
export const createUserController = (req, res) => {
  try {
    const userId = createUserSevice(req);
    res.status(200).json({
      user: userId,
    });
  } catch (error) {
    res.status(400);
  }
};

/**
 * Update user
 * @param {*} req
 * @param {*} res
 */
export const updateUserController = (req, res) => {
  try {
    const data = updateUserSerivce(req);
    res.status(200).json({
      user: data,
    });
  } catch (error) {
    res.status(400);
  }
};

/**
 * Delete user by id
 * @param {*} req
 * @param {*} res
 */
export const deleteUserController = (req, res) => {
  try {
    const data = deleteUserService(req);
    res.status(200).json({
      user: data,
    });
  } catch (error) {
    res.status(400);
  }
};
