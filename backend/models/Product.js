const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        Default:0
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Product  = mongoose.model('product',ProductSchema);
// User.createIndexes();
module.exports = Product;