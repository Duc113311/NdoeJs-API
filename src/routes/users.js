import express from "express";

import {
  getUserByIdController,
  getAllUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/users.js";
const router = express.Router();

// Method get, post, put, delete
router.get("/", getAllUserController);

router.post("/", createUserController);

router.get("/:id", getUserByIdController);

router.delete("/:id", deleteUserController);

router.patch("/:id", updateUserController);

export default router;
