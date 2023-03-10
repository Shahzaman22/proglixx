const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
    productId :{
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true,
        unique : true
    },
    card_number : {
        type : Number,
        unique : true,
        required : true
    },


})

const User = mongoose.model('Payment',paymentSchema, 'Payment') 

exports.User = User;