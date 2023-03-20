const {Product , schema} = require('../model/product')

exports.getProducts = async (req,res) => {
  const product =  await Product.find().populate('categories')
  res.json(product)
}

exports.createProducts = async (req,res) => {
    const {error} = schema.validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    const product = new Product({
      title: req.body.title,
      desc: req.body.desc,
      price: req.body.price,
      categories : req.body.categories,
      img: req.file ? req.file.filename : null,
    });

    await product.save()
    console.log(product.img);
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