const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const port = process.env.PORT || 3000
const session = require('express-session');

app.use(session({
  secret: process.env.PRIVATE_KEY,
  resave: false,
  saveUninitialized: true
}));


const users =  require('./routes/user.routes')
const products =  require('./routes/product.routes')
const categories =  require('./routes/category.routes')
const orders =  require('./routes/order.routes')
const payments = require('./routes/payment.routes')

//DB
require('./config/db')

//Routes
app.use('/api/users', users)
app.use('/api/products', products)
app.use('/api/categories', categories)
app.use('/api/orders', orders)
app.use('/api/payments', payments)

//PORT
app.listen(port, console.log(`Connecte to port ${port}`))