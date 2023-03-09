const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    Title :{
        type : String,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    Img : {
        type : String,
        required : true

    },
    Size : {
        type : String,
       
    },
    Color : {
        type : String,
      
    },
    Categories : {
        type : Array,
    },
    Price : {
        type : Number,
        
    }

})

const Product = mongoose.model('products', productSchema)

exports.Product = Product;