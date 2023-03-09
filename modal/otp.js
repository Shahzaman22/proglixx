const mongoose = require('mongoose')
// const Joi = require('joi')
const otpSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    code: String,
    createdAt: { type: Date, expires: 300, default: Date.now } 
  });

const User = mongoose.model('OTP',otpSchema);

// const schema = Joi.object({
//     name : Joi.string().min(5).max(255).required(),
//     password : Joi.string().min(5).max(255).required(),
//     phone : Joi.string().min(11).max(15).required(),
//     email : Joi.string().min(5).max(255).required().email(),
//     role : Joi.string().min(3).max(255),
//     gender : Joi.string().min(3).max(255),

// }) 

exports.User = User;
// exports.schema = schema;