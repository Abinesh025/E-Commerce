import express from "express";
import { getverifyAuthor, getverifyToken } from "../Middleware/protect.js";
import {    changePassword,
            createAuther, 
            deleteAdmin, 
            forgetPassword, 
            getAll, 
            getLogin, 
            getLogout, 
            getSpecificUser, 
            getUpdateAdmin, 
            getUpdateAuther, 
            getUser, 
            resetPassword 
    } from "../Controller/autherController.js";

import { getToken } from "../Utils/token.js";

const authRouter = express.Router();

authRouter.route("/createAuther").post(createAuther);

authRouter.route("/login").post(getLogin);

authRouter.route("/logout").get(getLogout);

authRouter.route("/forget/password").post(forgetPassword);

authRouter.route("/resetPassword/:token").post(resetPassword);

authRouter.route("/changePassword").put(getverifyToken,changePassword);

authRouter.route("/updateAuther").put(getverifyToken,getUpdateAuther);

authRouter.route("/user").get(getverifyToken,getUser);

// ADMIN

authRouter.route("/admin/All").get(getAll);
authRouter.route("/admin/user/:id").get(getverifyToken,getverifyAuthor("admin"),getSpecificUser)
                                    .put(getverifyToken,getverifyAuthor("admin"),getUpdateAdmin)
                                    .delete(getverifyToken,getverifyAuthor("admin"),deleteAdmin)
export default authRouter