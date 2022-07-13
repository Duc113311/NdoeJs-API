const UserService = require("../../services/users/userService.js");
const UserController = {};
UserController.getAllUserController = async (req, res) => {
  try {
    const users = await UserService.getAllUserSevice(req);
    if (!users) {
      res.sendStatus(401); // Unauthorized
    } else {
      if (!users.data) {
        res.sendStatus(403); //Forbidden
      } else {
        res.status(200).json({
          users: users,
        });
      }
    }
  } catch (error) {
    res.error;
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
