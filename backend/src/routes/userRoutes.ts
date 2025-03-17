import express from "express";
import * as uc from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

// Auth routes
router.post("/login", uc.login);
router.post("/register", uc.register);
router.post("/verify", uc.verifyUser);
router.post("/forgot-password", uc.forgotPassword);
router.post("/reset-password", uc.setNewPassword);
router.get("/me", auth, uc.getMe);
router.post("/logout", auth, uc.logout);

// User specific routes
router.get("/", uc.getUsers);
router.get("/:id", auth, uc.getUserById);
router.patch("/:id", uc.updateUser);
router.delete("/:id", uc.deleteUser);

export default router;
