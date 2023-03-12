const {Order} = require('../modal/orders');
const { Product } = require('../modal/product');

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
    res.send(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};


exports.createOrders = async (req,res) => {
try {
  const {products , quantity , shippingAddress} = req.body;

  const product = await Product.findById(products)
  if(!product) return res.status(400).send('Product not found')

  const total = product.price * quantity;

 const order = await new Order ({
    products,
    user : req.user.userId,
    quantity,
    shippingAddress,
    total
  });
  await order.save()
  res.json(order)
} 
catch (error) {
  res.send(error.message)
}
}

exports.updateOrders = async (req,res) => {
   const {id } = req.query;
   const order = await Order.findByIdAndUpdate(id,req.body)
  res.json(order)
}

exports.deleteOrders = async (req,res) => {
    const {id } = req.query;
    const order = await Order.findByIdAndDelete(id)
   res.json({order :  order, msg : "Delete successfully"})
 }