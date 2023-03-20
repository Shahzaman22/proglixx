const express = require('express')
const app = express()
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/usersList', auth, admin, userController.getUser)
router.post('/create', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/update', auth , admin, userController.updateUser)
router.delete('/delete', auth , admin, userController.deleteUser)
router.post('/verifyOtpAndCreateUser', userController.verifyOtpAndCreateUser) 
router.post('/edit', auth , userController.editUser) 

module.exports = router;


