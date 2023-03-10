const mongoose = require('mongoose')
const otpSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    code: String,
    createdAt: { type: Date, expires: 300, default: Date.now } 
  });

const User = mongoose.model('Otp',otpSchema, 'Otp');

exports.User = User;