const express = require("express");

const UserController  = require("../controllers/users.js");

const router = express.Router();

// Method get, post, put, delete
router.get("/", UserController.getAllUserController);

router.post("/", UserController.createUserController);

router.get("/:id", UserController.getUserByIdController);

router.delete("/:id", UserController.deleteUserController);

router.patch("/:id", UserController.updateUserController);

module.exports = router;
