import JWT from "jsonwebtoken";
import userModel from "../model/userModel.js";

//protected routes token base

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRECT
    );
    req.user=decode;
    next();
  } catch (e) {
    console.log(e);
  }
};

//admin acess
export const isadmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        sucess: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(401).send({
      success: false,
      e,
      message: "error in admin middleware",
    });
  }
};
