import express from "express";
import { registerController, loginController,testController } from "../controllers/authController.js";
import { isadmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing

//Register
router.post("/register", registerController);

//LOGIN ||post

router.post("/login", loginController);

//for jwt testin
router.get('/test',requireSignIn,isadmin,testController);

export default router;
