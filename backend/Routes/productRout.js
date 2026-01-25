import express from "express";
import {    
            createProducts, 
            deleteReviews, 
            getAllReviews, 
            getDelete, 
            getProducts, 
            getReviews, 
            getSingleProduct, 
            getUpdate 
        } from "../Controller/productsControl.js";
import { getverifyAuthor, getverifyToken } from "../Middleware/protect.js";
import { get } from "mongoose";
const productsRouter = express.Router();


productsRouter.route("/products").get(getverifyToken,getProducts);

productsRouter.route("/reviews").put(getverifyToken,getReviews);

productsRouter.route("/review").get(getverifyToken,getAllReviews)
                                .delete(getverifyToken,deleteReviews)

productsRouter.route("/createProducts").post(getverifyToken,getverifyAuthor("admin"),createProducts);

productsRouter.route("/product/:id")
                                    .get(getSingleProduct)
                                    .put(getUpdate)
                                    .delete(getDelete)

export default productsRouter