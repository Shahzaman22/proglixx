const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
   userId : {
    type : String
   },
   products : [{
    productId : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        default : 1 
    }
   }],
    amount : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        default : 'pending'
    },
    total_price : {
        type : Number,
        required : true
    },
    order_date : {
        type : Date,
        default : Date.now()
    }

})

const User = mongoose.model('users',orderSchema) 

exports.User = User;