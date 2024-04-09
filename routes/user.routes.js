import express from "express";
import cookieParser from "cookie-parser";
import { checkAndRenewToken } from "../middleware/validatoken.js";

import {
  createUser,
  loginUser,
  getUsers,
  validateToken,
} from "../controller/authUser.controller.js";
const app = express();
app.use(cookieParser());
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/validateToken", checkAndRenewToken, validateToken); // this authomatically runs on refresh because it is a get request
// userRouter.delete("/delete", deleteUser )

// userRouter.use(verifyJWT

export default userRouter;
