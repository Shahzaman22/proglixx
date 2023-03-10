const mongoose = require('mongoose')
const Joi = require('joi')
const productSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    img : {
        type : String,
        // required : true

    },
    size : {
        type : String,
       
    },
    color : {
        type : String,
      
    },
    categories :  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      }],
    price : {
        type : Number,
        
    }

})

const Product = mongoose.model('Product', productSchema, 'Product')

const schema = Joi.object({
    title : Joi.string().min(5).max(255).required(),
    desc : Joi.string().min(5).max(255).required(),
    img : Joi.string().min(10).max(15),
    size : Joi.string().min(5).max(255),
    color : Joi.string().min(3).max(255),
    categories : Joi.array().min(1).max(1024),
    price : Joi.string(),

}) 

exports.schema = schema;
exports.Product = Product;