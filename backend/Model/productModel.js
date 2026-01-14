import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter a Product Name"],
        trim:true,
        maxLength:[100,"Products Length Cannot be Exceeds 100 Characters"]
    },
    price:{
        type:Number,
        required:true,
        default:0.0
    },
    description:{
        type:String,
        required:[true,"Please Enter a Description"]
    },
    ratings:{
        type:Number,
        default:0.0
    },
    images:[{
        filename:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"],
        enum:{
            values:[
                "Electronics",
                "Home",
                "Sports",
                "HealthCare",
                "Beauty",
                "Foods",
                "Mobile",
                "AutoMobile",
                "Dress",
                ""
            ],
            message:"Please Select a Product Category"
        }
    },
    seller:{
        type:String,
        required:[true,"Please Enter a Seller"]
    },
    stock:{
        type:Number,
        required:[true,"Please Select a  Num of Stock"],
        maxLength:[20,"Stocks Must be with 20 Quatity" ]
    },
    numOfReview:{
        type:Number,
        default:0.0
    },
    review:[{
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comments:{
            type:String,
            required:true
        },
    }],
        user:{
            type:mongoose.Schema.ObjectId
        },
    createdAT:{
        type:Date,
        default:Date.now()
    }
});

const productsModel = mongoose.model("products",productSchema);

export default productsModel