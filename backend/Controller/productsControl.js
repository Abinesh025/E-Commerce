import Product from "../Model/productModel.js";
import ErrorHandler from "../Utils/error.js";
import AsyncError from "../Middleware/AsyncError.js";
import api from "../Utils/apiFeastures.js";
import { Query } from "mongoose";
import { getResponse } from "../Utils/JWT.js";

// <-----------Get All Products--------->

export const getProducts = AsyncError(async(req,res,next)=>{

    const resperpage=2;
   
    const product  = new api(Product.find(),req.query).search().filter().pagination(resperpage);

    const products = await product.query ;

    return res.status(200).json({success :true, count:products.length ,products});
    }

)
// <-----------Create Products--------------->

export const createProducts = AsyncError(async(req,res,next)=>{

       req.body.user = req.user.id;
  
        const product =  await  Product.create(req.body)

        return res.status(200).json({success:true,product});
    
       
 
});
// <----------Get Single Products----------->

export const getSingleProduct =  AsyncError(async(req,res,next)=>{

 
 
        const product = await Product.findById(req.params.id);    

        if(!product){
         return  next(new ErrorHandler("Products Not Found",400));
        }

        return  res.status(200).json({success:true,product})


} )

// <-----------Update Products---------->

export const getUpdate = async(req,res)=>{
    try
    {
        let product = await Product.findById(req.params.id);

        if(!product){
            return res.status(400).json({Success:false});

        }

        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
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
        const  product = await Product.findByIdAndDelete(req.params.id)

        if(!product){
            return res.status(400).json({success:false});
        }

        return res.status(200).json({success:true,Message:"Deleted SuccessFully"});
    }catch(error)
    {
        return res.status(500).json({error:`Internal Server Error ${error.message}`})
    }
}

// Reviews

export const getReviews = AsyncError(async(req,res,next)=>{

    const {ProductID,rating,comments} = req.body;

    const newReview = {
        user:req.user._id,
        rating,
        comments
    };

    const product = await Product.findById(ProductID);

    // Confirm Already Reviwed

    const isReviewd = product.review.find(review=>{
        return review.user.toString()==req.user.id.toString()
    })

// Check Reviws

    if(isReviewd){

        product.review.forEach((review)=>{
            if(review.user.toString() == req.user.id.toString()){
                review.rating = rating,
                review.comments = comments
            }
        })

    }else{
         product.review.push(newReview)
         product.numOfReview = product.review.length;
    }

        // Handle Ratings

    product.ratings = product.review.reduce((acc,review)=>{
        return review.rating + acc
    },0) / product.review.length;

    product.ratings = isNaN(product.ratings )? 0 : product.ratings;

    await product.save({validateBeforeSave:false});

    return res.status(200).json({success:true,message:"Reviewed Successfully"})

})

//  Get Review /api/get/review/?id=******

export const getAllReviews = AsyncError(async(req,res,next)=>{

    const reviews = await Product.findById(req.query.id).populate("review.user","name email");

    if(!reviews){
        return next(new ErrorHandler("Review Not's Found",400))
    }

    return res.status(200).json({success:true,reviews:reviews.review});

}) 

// Delete Reviws

export const deleteReviews = AsyncError(async(req,res,next)=>{

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product Not Found",400))
    }

    const reviews = product.review.filter(review=>{
       return review._id.toString() !== req.query.id.toString()
    });

    let numOfReview = reviews.length;
    let rating =  reviews.reduce((acc,review)=>{
        return review.rating + acc
    },0) / reviews.length;

    rating = isNaN(rating)? 0 : rating;
    await Product.findByIdAndUpdate(req.query.productId,{
        ratings:rating,
        numOfReview:numOfReview,
       review:reviews
    })
    await product.save({validateBeforeSave:false})

    return res.status(200).json({success:true})



})