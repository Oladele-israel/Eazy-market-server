import express from "express";
import cookieParser from "cookie-parser";

import LoginLimiter from "../middleware/loginLimiter.js";
import {
  createUser,
  loginUser,
  getUsers,
} from "../controller/authUser.controller.js";
const app = express();
app.use(cookieParser());
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", createUser);
userRouter.post("/login", LoginLimiter, loginUser);

// userRouter.use(verifyJWT

export default userRouter;
