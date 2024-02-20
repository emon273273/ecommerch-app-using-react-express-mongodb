import express from "express";
import { registerController } from "../controllers/authController.js";
//router object
import { loginController } from "../controllers/authController.js";

const router = express.Router();

//routing

//Register

router.post("/register", registerController);

//LOGIN ||post

router.post("/login", loginController);

export default router;
