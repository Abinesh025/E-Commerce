import AsyncError from "../Middleware/AsyncError.js";
import ErrorHandler from "../Utils/error.js";
import autherModel from "../Model/autherModel.js"
import { getResponse } from "../Utils/JWT.js";
import { getToken } from "../Utils/token.js";
import { getEmail } from "../Utils/email.js";
import crypto from "crypto";

// Create Student

export const createAuther = async(req,res)=>{

    

    const {name,email,password} = req.body;

   const user = await autherModel.create({
        name,
        email,
        password
    });

    getResponse(user,200,res);
}

// Login

export const getLogin = AsyncError(async(req,res,next)=>{

    const {email,password} = req.body;

    const user = await autherModel.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("User Not Found",400));
    }

    if(!email || !password){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }

    if(!await(user.isValidPassword(password))){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }
    
    getToken(user._id,res)

    getResponse(user,200,res);
})

// Logout

export const getLogout  = AsyncError(async(req,res,next)=>{

    return res.cookie("JWT",null,{
        maxAge:new Date(Date.now()),
        httpOnly:true
    }).json({success:true,message:"LogOut SuccessFully"});
})

// Update

export const getUpdateAuther = AsyncError(async(req,res,next)=>{
    
})

// ForgetPassword

export const forgetPassword = AsyncError(async(req,res,next)=>{

    const {email} = req.body;

    const user = await autherModel.findOne({email});

    if(!user){
        return next(new ErrorHandler("User Not Found", 400));
    }

    const resetToken =await user.getResetPassword();

   await user.save({validateBeforeSave:false});

    const resetUrl = `${req.protocol}://${req.get("host")}/api/get/forgetpassword/${resetToken}`;

    const txt = `Your Password Reset URL is Given Below \n\n ${resetUrl} \n\n If You don't want to change other wise skip this...`

    try{
      await getEmail({
            email:user.email,
            sub:"Email Recovery From E-Cart",
            txt
        })
        
      return  res.status(200).json({success:true,message:`Email sent ${user.email} successfully`});
    }
    catch(error)
    {
        user.resetpassword = undefined;
        user.resetpasswordtoken = undefined;
       await user.save({validateBeforeSave:false});
        next(new ErrorHandler("Don't Change Password",400))
    }
})

// Reset Password

export const resetPassword = AsyncError(async(req,res,next)=>{
    const resetpassword= crypto.createHash("sha256").update(req.params.token).digest("hex");

    const {password,confirmPassword}  = req.body;

    const user = await autherModel.findOne({resetpassword,resetpasswordtoken:{$gt:Date.now()}});

    if(!user){
        return new ErrorHandler("Token Not valid for modify",400)
    };

    if(!password || !confirmPassword){
        return new ErrorHandler("Enter Password or current Password",400)
    };

    if(password !== confirmPassword){
        return new ErrorHandler("Password doesn't match",400)
    }
    
    user.password = password;
    user.resetPassword = undefined;
    user.resetpasswordtoken = undefined;
    await user.save({validateBeforeSave:false});

    getToken(user._id,res);

    getResponse(user,200,res);
    

})

// User

export const getUser = AsyncError(async(req,res,next)=>{

    const user = await autherModel.findOne({_id:req.user._id});

    if(!user){
        return new ErrorHandler("User Not Found",400);
    }

    return res.status(200).json({success:true,user});
})