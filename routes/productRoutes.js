const express = require('express')
const app = express()
const router = express.Router()
const productController = require('../controllers/productController')
const admin  = require('../middleware/admin')
const auth = require('../middleware/auth')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({ storage: storage });



router.post('/create' ,upload.single('img'), productController.createProducts)
router.get('/getProductList', auth,  productController.getProducts)
router.put('/update',  auth,admin, productController.updateProducts)
router.delete('/delete',auth, admin, productController.deleteProducts)

module.exports = router;