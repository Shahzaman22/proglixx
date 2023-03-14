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

})

const User = mongoose.model('News',newsSchema, 'News') 

exports.User = User;