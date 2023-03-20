const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }],
  productId: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  }],
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  stripePaymentId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('Payment', paymentSchema, 'Payment');

exports.Payment = Payment;
