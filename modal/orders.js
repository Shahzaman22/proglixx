const { string } = require('joi');
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
  user: [{

      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
  quantity: {
      type: Array,
      required: true
    },
  total: {
    type: String,
    min: 0
  },
  shippingAddress: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});


const Order = mongoose.model('Order', OrderSchema, 'Order');

exports.Order = Order
