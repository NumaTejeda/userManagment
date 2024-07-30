import express from "express";
import { registerUser, loginUser, logOut } from "../controllers/authController.js";

const router = express.Router();

router.post('/registro', registerUser)
router.post('/login', loginUser)
router.post('/logout', logOut);

export default router;