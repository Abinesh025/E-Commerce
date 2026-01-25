import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const autherSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Enter a Username"]
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validate:[validator.isEmail,"Please Enter a Valid Email Format"]
        },
        password:{
            type:String,
            required:true,
            maxLength:[9,"Password must with in 9 characters "],
            select:false
        },
        avatar:{
            type:String,
            default:""
        },
        resetpassword:String,
        resetpasswordtoken:Date,
        role:{
            type:String,
            default:"admin"
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }
    }
)
    // <--------Password Handling---------->
autherSchema.pre("save",async function (next){
    if(!this.isModified("password")){
      return ;
    }
    const salt = await bcryptjs.genSalt(10);
    this.password =await bcryptjs.hash(this.password,salt);
});


autherSchema.methods.isValidPassword = async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword,this.password)
};

autherSchema.methods.getResetPassword = function (){

    // Genrate Token
  const token =  crypto.randomBytes(20).toString("hex");

    // Hash Reset Password

    this.resetpassword = crypto.createHash("sha256").update(token).digest("hex");

    // Set Expires Token

    this.resetpasswordtoken = Date.now() + 30 * 60 * 1000;

    return token;

}

const autherModel = new mongoose.model("User",autherSchema);

export default autherModel
