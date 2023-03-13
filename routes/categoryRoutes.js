const express = require('express')
const app = express()
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const admin = require('../middleware/admin')
const auth = require('../middleware/auth')


router.post('/create', auth, admin, categoryController.createCategory)
router.get('/getAllCategories',auth, categoryController.getCategory)
router.put('/update',auth, admin, categoryController.updateCategory)
router.delete('/delete',auth, admin, categoryController.deleteCategory)

module.exports = router;