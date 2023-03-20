const express = require('express')
const app = express()
const router = express.Router()
const orderController = require('../controllers/orderController')
// const admin  = require('../middleware/admin')
const auth = require('../middleware/auth')

router.post('/create', auth,  orderController.createOrders)
router.get('/getOrderList', auth, orderController.getOrders)
router.put('/update',  orderController.updateOrders)
router.delete('/delete', orderController.deleteOrders)
router.delete('/track', orderController.trackOrder)

module.exports = router;