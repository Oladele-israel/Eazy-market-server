import express from "express";
import cookieParser from "cookie-parser";
import { checkAndRenewToken } from "../middleware/validatoken.js";

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
userRouter.post("/login", loginUser);
userRouter.get("validateToken", checkAndRenewToken);
// userRouter.delete("/delete", deleteUser )

// userRouter.use(verifyJWT

export default userRouter;
