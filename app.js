const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./util/database')
const cors = require('cors')
const app = express()

const homepage = require('./routes/homeroutes')
app.use(cors())
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use('/', homepage)


sequelize
 .sync( )
 .then(result => {
    console.log('database connected')
    app.listen(1000) 
     })
 .catch(err => console.log(err))