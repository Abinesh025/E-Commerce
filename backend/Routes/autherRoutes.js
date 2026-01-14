import express from "express";
import { createAuther, forgetPassword, getLogin, getLogout, getUpdateAuther, getUser, resetPassword } from "../Controller/autherController.js";
import { getverifyToken } from "../Middleware/protect.js";
import { getToken } from "../Utils/token.js";
const authRouter = express.Router();

authRouter.route("/createAuther").post(createAuther);

authRouter.route("/login").post(getLogin);

authRouter.route("/logout").get(getLogout);

authRouter.route("/forget/password").post(forgetPassword);

authRouter.route("/resetPassword/:token").post(resetPassword);

authRouter.route("/updateAuther").post(getUpdateAuther);

authRouter.route("/user").get(getverifyToken,getUser);

export default authRouter