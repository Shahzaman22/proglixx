const {Product , schema} = require('../modal/product')


exports.getProducts = async (req,res) => {
  const product =  await Product.find().populate('categories')
  res.json(product)
}

exports.createProducts = async (req,res) => {
    const {error} = schema.validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    const product =  await new Product (req.body)
    await product.save()
    res.json(product)

    // const product =  await new Product({
    //   title : req.body.title,
    //   desc : req.body.desc,
    //   img : req.file.filename, // This gets the filename of the uploaded image
    //   size : req.body.size,
    //   color : req.body.color,
    //   categories : req.body.categories,
    //   price : req.body.price
    // })
    // await product.save()
    // res.json(product)
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