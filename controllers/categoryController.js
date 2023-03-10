const {Category, schema} = require('../modal/category')


exports.getCategory = async (req,res) => {
  const category =  await Category.find()
  res.json(category)
}

exports.createCategory = async (req,res) => {
    const {error} = schema.validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    const category =  await new Category (req.body)
    await category.save()
    res.json(category)
}

exports.updateCategory = async (req,res) => {
   const {id } = req.query;
   const category = await Category.findByIdAndUpdate(id,req.body)
  res.json(category)
}

exports.deleteCategory = async (req,res) => {
    const {id } = req.query;
    const category = await Category.findByIdAndDelete(id)
   res.json({categories :  category, msg : "Delete successfully"})
 }