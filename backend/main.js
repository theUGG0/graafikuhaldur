require('dotenv').config({ path: '../.env' })
const express = require('express')
const router = require('./routes/personRoutes')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
