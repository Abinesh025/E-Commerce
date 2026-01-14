export const getResponse = (user,statusCode,res)=>{

   return  res.status(statusCode).json({
        success:true,
        user
    })
}