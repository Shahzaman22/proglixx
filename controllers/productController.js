const {Product , schema} = require('../modal/product')


exports.getProducts = async (req,res) => {
  const product =  await Product.find()
  res.json(product)
}

exports.createProducts = async (req,res) => {
    const {error} = schema.validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    const product =  await new Product (req.body)
    await product.save()
    res.json(product)
}

exports.updateProducts = async (req,res) => {
   const {id } = req.query;
   const product = await Product.findByIdAndUpdate(id,req.body)
  res.json(product)
}

exports.deleteProducts = async (req,res) => {
    const {id } = req.query;
    const product = await Product.findByIdAndDelete(id)
   res.json({products :  product, msg : "Delete successfully"})
 }