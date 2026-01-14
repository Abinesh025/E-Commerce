import ProductsModel from "../Model/productModel.js";
import ErrorHandler from "../Utils/error.js";
import AsyncError from "../Middleware/AsyncError.js";
import api from "../Utils/apiFeastures.js";
import { Query } from "mongoose";

// <-----------Get All Products--------->

export const getProducts = AsyncError(async(req,res,next)=>{

    const resperpage=2;
   
    const product  = new api(ProductsModel.find(),req.query).search().filter().pagination(resperpage);

    const products = await product.query ;

    return res.status(200).json({success :true, count:products.length ,products});
    }

)
// <-----------Create Products--------------->

export const createProducts = AsyncError(async(req,res,next)=>{

       req.body.user = req.user.id;
  
        const product =  await  ProductsModel.create(req.body)

        return res.status(200).json({success:true,product});
    
       
 
});
// <----------Get Single Products----------->

export const getSingleProduct =  AsyncError(async(req,res,next)=>{

 
 
        const product = await ProductsModel.findById(req.params.id);    

        if(!product){
         return  next(new ErrorHandler("Products Not Found",400));
        }

        return  res.status(200).json({success:true,product})


} )

// <-----------Update Products---------->

export const getUpdate = async(req,res)=>{
    try
    {
        let product = await ProductsModel.findById(req.params.id);

        if(!product){
            return res.status(400).json({Success:false});

        }

        product = await ProductsModel.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })

        return res.status(200).json({Success:true,product})
    }
    catch(error)
    {
        return res.status(500).json({error:`Internal Server Error ${error.message}`})
    }
}

// <----------Delete Products--------->

export const getDelete = async(req,res)=>{
    try
    {
        const  product = await ProductsModel.findByIdAndDelete(req.params.id)

        if(!product){
            return res.status(400).json({success:false});
        }

        return res.status(200).json({success:true,Message:"Deleted SuccessFully"});
    }catch(error)
    {
        return res.status(500).json({error:`Internal Server Error ${error.message}`})
    }
}