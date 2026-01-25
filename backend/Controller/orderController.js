import AsyncError from "../Middleware/AsyncError.js";
import Order from "../Model/orderModel.js";
import ErrorHandler from "../Utils/error.js";
import { getResponse } from "../Utils/JWT.js";
import Product from "../Model/productModel.js";

// Create Order

export const createOrder = AsyncError(async(req,res,next)=>{

    const {
            shippingInfo,
            orderItems,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            payment

    } = req.body;

    const order =await Order.create({
            shippingInfo,
            orderItems,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            payment,
            user:req.user._id,
            paidAt:Date.now()
    })

    if(!order){
        return next(new ErrorHandler("Token Not Found",400))
    }

    getResponse(order,200,res)

})

// Get Single Order

export const getSingleOrder = AsyncError(async(req,res,next)=>{

    const order = await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order Not Availablle",400))
    }

    getResponse(order,200,res);
})

// Get All Orders

export const getAllOrder = AsyncError(async(req,res,next)=>{

    const orders = await Order.find();

    let totalPrice = 0;

    orders.forEach(order=>{
        totalPrice += order.totalPrice
    })

    return res.status(200).json({success:true,count:orders.length,orders,totalPrice})
})

// Get Login User Order

export const myOrder = AsyncError(async(req,res,next)=>{
    const order = await Order.find({user:req.user._id})

    if(!order){
        return next(new ErrorHandler(`Your Order is Not Found`))
    }

    getResponse(order,200,res)
})

// Get Update Order

export const updateOrder = AsyncError(async(req,res,next)=>{

    // const body;
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("order not found",400))
    }

    if(order.orderStatus=="Delivered"){
        return next(new ErrorHandler("Order has been already Deleverid"))
    }

    order.orderItems.forEach(async orderItem=>{
        await updateQuantity(orderItem.product,orderItem.quantity)
    })

    
    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save()

    getResponse(order,200,res)

})

// Reduce Quantity Not a Function

export const updateQuantity = AsyncError(async(productID,quantity)=>{

    const product = await Product.findById(productID);

    product.stock = product.stock - quantity;

    await product.save({validateBeforeSave:false})

})

// Delete Order

export const deletOrder = AsyncError(async(req,res,next)=>{

    const order = await Order.findByIdAndDelete(req.params.id);

    if(!order){
        return next(new ErrorHandler("Can't able to Delete "))
    }

    return res.status(200).json({success:true,message:"Order Deleted Successfully"})
})
