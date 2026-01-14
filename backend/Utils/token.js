import AsyncError from "../Middleware/AsyncError.js";
import Jasonwebtoken from "jsonwebtoken"
import ErrorHandler from "./error.js";

export const getToken = AsyncError(async(userID,res)=>{

    const token = Jasonwebtoken.sign({userID},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    })

    res.cookie("JWT",token,{
        httpOnly:true,
        sameSystem:true,
        maxAge:process.env.COOKIE_EXPIRES * 24 * 60 * 1000
    });

   return  new ErrorHandler("Token Not Found",400)
})