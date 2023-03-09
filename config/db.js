const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/proglix')
.then(() => console.log('DB is connected to PROGLIX'))
.catch(() => console.log('Not connected'))