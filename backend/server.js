import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { getDataBaseConnection } from "./DataBase/db.js";
import productsRouter from "./Routes/productRout.js";
import ErrorHandler from "./Middleware/ErrorHandler.js";
import qs from "qs";
import authRouter from "./Routes/autherRoutes.js";
import cookieparser from "cookie-parser"
import orderRoute from "./Routes/orderRoutes.js";


const app = express();
app.use(express.json());
app.use(cookieparser());

const filename = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path:path.join(filename,"config",".env")});

app.use((req, res, next) => {
  next();
});

app.use("/api/get",productsRouter);

app.use("/api/get",authRouter);

app.use("/api/get",orderRoute);

app.use(ErrorHandler)

 
app.set("query parser", str => qs.parse(str))
// <-------------Running Port------------>

const server = app.listen(process.env.PORT,()=>{
    console.log(`The server is runs on ${process.env.PORT} for ${process.env.NODE_ENV}`);
    getDataBaseConnection();
})

// <-----------Handle Errors------------>

process.on("unhandledRejection",(err)=>{
    console.log(err.message);
    console.log('The serevr is shotDown due to unhandledRejection');
    server.close(()=>{
        process.exit(1);
    })
})

process.on("uncaughtException",(err)=>{
    console.log(err.message);
    console.log('The serevr is shotDown due to uncaughtException');
    server.close(()=>{
        process.exit(1);
    })
})
