import users from "../models/users.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import express from "express";
import { Admin } from "mongodb";
const app = express();
app.use(cookieParser());

//getting all the users
const getUsers = async (req, res) => {
  try {
    const allUsers = await users.find({});
    res.status(200).json({
      success: true,
      users: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
//signing up users
const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, username, email, password, phoneNumber } = req.body;
    //vetting username because on tow person could bear one name
    const validUserName = await users.findOne({ username: username }).exec();
    if (validUserName) {
      console.log(validUserName);
      return res.status(403).json({
        success: false,
        message: "userName already exist choose another",
      });
    }

    //validating email: using validator.js
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    //using bcryptjs to hash password
    const salt = await bcrypt.genSalt(15);
    const saltedPass = await bcrypt.hash(password, salt);

    const created_User = await users.create({
      name,
      username,
      email,
      password: saltedPass,
      phoneNumber,
    });

    // Destructure _doc and exclude password
    const { password: userPassword, ...rest } = created_User._doc;

    res.status(201).json({
      success: true,
      message: "user created succesfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " user not created",
      error: error.message,
    });
  }
};

//compare pasword function
const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  //check if email is valid in the database
  const validEmail = await users.findOne({ email: email }).exec();

  if (!validEmail) {
    res.status(404).json({
      success: false,
      message: "email not registered.",
    });
    return;
  }
  console.log(validEmail);
  //check if the password is correct
  const validPassword = await bcrypt.compare(
    req.body.password,
    validEmail.password
  );
  console.log("this is the valid pass", validPassword);
  if (!validPassword) {
    res.status(409).json({
      success: false,
      message: "Invalid password.",
    });
    return;
  }

  //we will generate our access token and refresh token using jwt
  const accessToken = jwt.sign(
    {
      access1: validEmail.username,
      access2: validEmail._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "60s",
    }
  );

  const refreshToken = jwt.sign(
    {
      access1: validEmail.username,
      access2: validEmail._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  //passing the user data
  const userData = {
    name: validEmail.name,
    username: validEmail.username,
    Admin: validEmail.Admin,
    phoneNumber: validEmail.phoneNumber,
  };
  //push to cookie for storage
  res.cookie("hellobro", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 1000,
  });
  res.cookie("hellosis", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  //validating user
  return res.status(200).json({
    success: true,
    message: "Login successful.",
    userData,
  });
};

const validateToken = (req, res) => {
  const authUser = req.userData;
  const currentUser = {
    _id: authUser._id,
    name: authUser.name,
    username: authUser.username,
    email: authUser.email,
    bio: authUser.bio,
    phone_number: authUser.phone_number,
    isAdmin: authUser.isAdmin,
  };
  res.status(200).json({
    success: true,
    message: "Authorized",
    userDetail: currentUser,
  });
};

export { createUser, loginUser, getUsers, validateToken };
//persistence user login
