const {Order} = require('../model/orders');
const { Product } = require('../model/product');
const {trackingNumberr} = require('../utils/trackingNumber')
const EasyPost = require('@easypost/api')

exports.getOrders = async (req, res) => {
  const { id } = req.query;
  try {
    const order = await Order.findById(id)
      .populate({
        path: 'products',
        populate: {
          path: 'categories',
          model: 'Category'
        }
      })
      .populate('user')
    
    order.total = order.products.reduce((total, product, index) => {
      return total + (product.price * order.quantity[index])
    }, 0);
    await order.save();
    res.send(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};


exports.createOrders = async (req,res) => {
try {  
  const {products , quantity , shippingAddress } = req.body;

  const product = await Product.findById(products)
  if(!product) return res.status(400).send('Product not found')

  let total = 0;
  for (let i = 0; i < products.length; i++) {
    const product = await Product.findById(products[i])
    if (!product) return res.status(400).send('Product not found')
    total += product.price * quantity[i]
  }

  //Tracking Number
  let testvalue = trackingNumberr();


 const order = await new Order ({
    products,
    user : req.user.userId,
    quantity,
    shippingAddress,
    total,
    trackingNumber: testvalue
  });

  await order.save()
  res.json(order)
} 
catch (error) {
  res.send(error.message)
}
}

exports.updateOrders = async (req,res) => {

  const {products } = req.body;

  const product = await Product.findById(products)
  if(!product) return res.status(400).send('Product not found')

   const {id } = req.query;
   const order = await Order.findByIdAndUpdate(id,req.body)
  res.json(order)
}

exports.deleteOrders = async (req,res) => {
    const {id } = req.query;
    const order = await Order.findByIdAndDelete(id)
   res.json({order :  order, msg : "Delete successfully"})
 }

exports.trackOrder = async (req,res) => {
  const order = await Order.find()
  EasyPost.Tracker.all(order.trackingNumber, (err, trackers) => {
    if (err) {
      console.log('Error retrieving tracking information:', err);
    } else {
      console.log('Tracking information:', trackers);
    }
  });
  
}
