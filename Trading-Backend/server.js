require('./lib/config')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static('./lib/Uploads'))
app.use(cors())
require('dotenv').config()

let PORT = process.env.PORT

require('./lib/routes')(app);

app.listen(PORT,(err)=>{
    if(err) console.log('Server Error =>>',err)
    else console.log('Server listening on PORT =>>',PORT)
})