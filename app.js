const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)


mongoose.connect(config.MONGODB_URI)
.then(()=> {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connecting to mongodb:', error.message)
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


//https://fullstackopen.com/zh/part4/%E4%BB%8E%E5%90%8E%E7%AB%AF%E7%BB%93%E6%9E%84%E5%88%B0%E6%B5%8B%E8%AF%95%E5%85%A5%E9%97%A8
module.exports = app