const {Order} = require('../modal/orders')


exports.getOrders = async (req,res) => {
  const order =  await Order.find()
  res.json(order)
}

exports.createOrders = async (req,res) => {


    const order =  await new Order(req.body)
    await order.save()
    res.json(order)
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