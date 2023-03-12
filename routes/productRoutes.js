const express = require('express')
const app = express()
const router = express.Router()
const productController = require('../controllers/productController')
const admin  = require('../middleware/admin')
const auth = require('../middleware/auth')
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); 


router.post('/create' , productController.createProducts)
router.get('/getProductList',   productController.getProducts)
router.put('/update',  auth,admin, productController.updateProducts)
router.delete('/delete',auth, admin, productController.deleteProducts)

module.exports = router;