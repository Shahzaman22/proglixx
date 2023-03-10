const mongoose = require('mongoose')
const newsSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    Img : {
        type : String,
        required : true,
    },
    Size : {
        type : String,
        default : false
    },
    Color : {
        type : Boolean,
        default : false
    },

})

const User = mongoose.model('News',newsSchema, 'News') 

exports.User = User;