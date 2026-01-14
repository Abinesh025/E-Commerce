import autherModel from "../Model/autherModel.js";
import ErrorHandler from "../Utils/error.js";
import AsyncError from "./AsyncError.js";
import jsonwebtoken from "jsonwebtoken";

export const getverifyToken = async(req,res,next)=>{

    const token = req.cookies.JWT;

    if(!token){
        return new ErrorHandler("Token in Not Found in Protect",400);
    }

    const decode = jsonwebtoken.verify(token,process.env.JWT_SECRET_KEY);

    if(!decode){
        return new ErrorHandler("Token Doesn't Match",400);
    }

    const user = await autherModel.findById({_id:decode.userID});

    if(!user){
        return new ErrorHandler("User Not Found",400);
}

    req.user = user;
    
    next();
}

export const getverifyAuthor = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} don't have access to products`,400))
        }
        next();
    }
}