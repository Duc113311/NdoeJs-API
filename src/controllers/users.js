const UserService = require("../services/userService.js");
const UserController = {};
UserController.getAllUserController = async (req, res) => {
  try {
    const users = await UserService.getAllUserSevice();
    res.status(200).json({
      users: users,
    });
  } catch (error) {
  }
};

/**
 * Xem chi tiết user
 * @param {*} req
 * @param {*} res
 */
UserController.getUserByIdController = (req, res) => {
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
UserController.createUserController = async (req, res) => {
  try {
    const user = await UserService.createUserSevice(req);
    res.status(200).json({
      user: user,
      message: "Success",
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
UserController.updateUserController = (req, res) => {
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
UserController.deleteUserController = (req, res) => {
  try {
    const data = deleteUserService(req);
    res.status(200).json({
      user: data,
    });
  } catch (error) {
    res.status(400);
  }
};

module.exports = UserController;
