const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    quantity: {
      type: Number,
      required: true
    },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  shippingAddress: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', OrderSchema, 'Order');

exports.Order = Order
