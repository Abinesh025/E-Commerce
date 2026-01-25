import express from "express"
import { createOrder, deletOrder, getAllOrder, getSingleOrder, myOrder, updateOrder } from "../Controller/orderController.js";
import { getverifyAuthor, getverifyToken } from "../Middleware/protect.js";
import { getAll } from "../Controller/autherController.js";
const orderRoute = express.Router();

orderRoute.route("/createOrder").post(getverifyToken,createOrder);

orderRoute.route("/order/:id").get(getverifyToken,getSingleOrder);
orderRoute.route("/order/:id").get(getverifyToken,getSingleOrder);
orderRoute.route("/myOrder").get(getverifyToken,myOrder);

// Admin Routes
orderRoute.route("/AllOrder").get(getverifyToken,getverifyAuthor("admin"),getAllOrder);

orderRoute.route("/order/:id").put(getverifyToken,getverifyAuthor("admin"),updateOrder)
                                .delete(getverifyToken,getverifyAuthor("admin"),deletOrder);

export default orderRoute