const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors'); 
const { application } = require('express');

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
app.use('/api/homepg', require('./routes/homepg'))
app.use('/api/superadmin', require('./routes/superadmin'))
app.use('/api/generaluser',require('./routes/generaluser'))
app.listen(port, () => {
  console.log(`whatsNext backend listening at http://localhost:${port}`)
})