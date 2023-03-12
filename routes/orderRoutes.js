const express = require('express')
const app = express()
const router = express.Router()
const orderController = require('../controllers/orderController')
// const admin  = require('../middleware/admin')
const auth = require('../middleware/auth')

router.post('/create', auth,  orderController.createOrders)
router.get('/getOrderList', orderController.getOrders)
router.put('/update',  orderController.updateOrders)
router.delete('/delete', orderController.deleteOrders)

module.exports = router;