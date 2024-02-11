import userModel from "../model/userModel.js";

import { hashPassword } from "./../helpers/authHelper.js";

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

        success:true,
        message:'User Register Successfully',
        user
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      e,
    });
  }
};
