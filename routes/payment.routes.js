const express = require('express')
const app = express()
const router = express.Router()
const paymentController = require('../controllers/paymentController')
const admin = require('../middleware/admin')
const auth = require('../middleware/auth')

router.post('/createPayment', auth, paymentController.createPayment)
router.post('/confirmPayment', auth, paymentController.confirmPayment)

module.exports = router;