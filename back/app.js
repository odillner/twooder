const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const router = require('./router')
const config = require('./utils/config')
const logger = require('./utils/logger')
const unknownEndpoint = require('./middleware/unknownEndpoint')
const errorHandler = require('./middleware/errorHandler')
const tokenAuth = require('./middleware/tokenAuth')

logger.info('connecting to', config.DB_URL)

mongoose
    .connect(config.DB_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => logger.info('connected to MongoDB'))
    .catch(err => logger.info('error connecting to MongoDB:', err.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(tokenAuth)


if (process.env.NODE_ENV !== 'test') {
    morgan.token('body', function (req) { return JSON.stringify(req.body) })
    app.use(morgan(':method :url :status :response-time ms - :res[content-length] byte :body - :req[content-length] byte'))
}

router(app)

app.use(errorHandler)
app.use(unknownEndpoint)

module.exports = app