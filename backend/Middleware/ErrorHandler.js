export default (err,req,res,next) =>{
    err.statusCode = err.status || 500

    // <--------Development--------->

    if(process.env.NODE_ENV == "Development"){
       return  res.status(err.statusCode).json({
          success:false,
          message:err.message,
          stack:err.stack,
          error:err
    })
  };
  
  // <----------Production--------->

    if(process.env.NODE_ENV == "Production"){

      let message = err.message;
      let error = new Error(message)

      // Validation Error

      if(err.name == "ValidationError"){

        message = Object.values(err.errors).map(value=>value.message);
        error = new Error(message);

      }

      // 11000 Error

      if(err.code == 11000){

        message = `your ${Object.keys(err.keyValue)} is already exists`
        error = new Error(message);

      }

      // Token Error

      if(err.name == "JsonWebTokenError"){

        message = `Json Token is invlid.Try again!`
        error = new Error(message);

      }

      // logout Error

      if(err.name == "TokenExpiredError"){

        message = `Json Token is Expired`
        error = new Error(message);
        
      }

      if(err.name == "CastError"){

        message = `Resource Not Found: ${err.path}`
        error = new Error(message);

      }

       return  res.status(err.statusCode).json({
          success:false,
          message:error.message || "Internal Server Error"
    });
    
  };
}