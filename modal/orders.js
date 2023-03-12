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
      type: Number,
      required: true
    },
  total: {
    type: Number,
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


// OrderSchema.virtual('productDetails', {
//   ref: 'Product',
//   localField: 'products',
//   foreignField: '_id',
//   justOne: false,
//   options: { 
//     populate: { 
//       path: 'categories', 
//       model: 'Category' 
//     } 
//   }
// });



const Order = mongoose.model('Order', OrderSchema, 'Order');

exports.Order = Order
