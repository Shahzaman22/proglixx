const express = require('express')
const app = express()
const router = express.Router()
const productController = require('../controllers/productController')
const admin  = require('../middleware/admin')
const auth = require('../middleware/auth')
router.post('/create', auth, admin , productController.createProducts)
router.get('/getProductList',  auth, admin, productController.getProducts)
router.put('/update',  auth,admin, productController.updateProducts)
router.delete('/delete',auth, admin, productController.deleteProducts)

module.exports = router;