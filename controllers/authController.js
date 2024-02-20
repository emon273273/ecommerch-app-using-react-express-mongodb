import userModel from "../model/userModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";

import Jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name) {
      return res.send({
        error: "name is requird",
      });
    }

    if (!email) {
      return res.send({
        error: "email is requird",
      });
    }

    if (!password) {
      return res.send({
        error: "password is requird",
      });
    }

    if (!phone) {
      return res.send({
        error: "phone number is requird",
      });
    }

    if (!address) {
      return res.send({
        error: "address is requird",
      });
    }

    //existing user check

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }

    //register user

    const hashedpassword = await hashPassword(password);

    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedpassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      e,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password",
      });
    }
    //token

    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRECT, {
      expiresIn: "3d",
    });

    res.status(200).send({
      success: true,
      message: " login suceessfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error in login",
      e,
    });
  }
};
