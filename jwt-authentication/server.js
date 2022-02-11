require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./router')
const app = express()


app.use(bodyParser.json())
app.use(cors())

app.use(router)

app.listen(3000, () => {
    console.log('app running')
})

