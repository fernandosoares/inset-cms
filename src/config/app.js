const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.LISTEN_PORT || 3030

app.listen(port, function() {
    console.log(`APP IS RUNNING ON PORT ${port}`)
})

module.exports = app