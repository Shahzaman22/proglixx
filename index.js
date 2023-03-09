const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const port = process.env.PORT || 3000


const users =  require('./routes/userRoutes')

//DB
require('./config/db')

//Routes
app.use('/api/users', users)

//PORT
app.listen(port, console.log(`Connecte to port ${port}`))