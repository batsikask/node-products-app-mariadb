const express = require('express')
const app = express()
const dataSource = require('./connect').dataSource
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger')

const cors = require('cors')
app.use(cors({
  origin: "*"
  // origin:["http://localhost:8000", "http://localhost:3000"]
}))

const user = require('./routes/user.route')
const product = require('./routes/product.route')


app.use('/', express.static('files'))
app.use('/api/users', user)
app.use('/api/products', product)

app.use('/api-docs', 
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument.options)
)

module.exports = app