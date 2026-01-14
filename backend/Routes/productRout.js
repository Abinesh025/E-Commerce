import express from "express";
import { createProducts, getDelete, getProducts, getSingleProduct, getUpdate } from "../Controller/productsControl.js";
import { getverifyAuthor, getverifyToken } from "../Middleware/protect.js";
const productsRouter = express.Router();


productsRouter.route("/products").get(getverifyToken,getProducts);

productsRouter.route("/createProducts").post(getverifyToken,getverifyAuthor("admin"),createProducts);

productsRouter.route("/product/:id")
                                    .get(getSingleProduct)
                                    .put(getUpdate)
                                    .delete(getDelete)

export default productsRouter