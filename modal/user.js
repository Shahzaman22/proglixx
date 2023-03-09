const mongoose = require('mongoose')
const Joi = require('joi')
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        minlength : 5,
        maxlength : 255,
        required : true
    },
    password : {
        type : String,
        minlength : 5,
        maxlength : 255,
        required : true
    },
    phone : {
        type : Number,
        minlength : 10,
        maxlength : 13,
        unique : true,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    role : {
        type : String,
        enum : ['user','admin'],
        default : 'user'
    },
    gender : {
        type : String,
        enum : ['male','female','other'],
        // default : 'user'
    }

})

const User = mongoose.model('users',userSchema);

const schema = Joi.object({
    name : Joi.string().min(5).max(255).required(),
    password : Joi.string().min(5).max(255).required(),
    phone : Joi.string().min(11).max(15).required(),
    email : Joi.string().min(5).max(255).required().email(),
    role : Joi.string().min(3).max(255),
    gender : Joi.string().min(3).max(255),

}) 

exports.User = User;
exports.schema = schema;