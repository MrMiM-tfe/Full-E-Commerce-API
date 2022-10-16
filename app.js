// Packages
const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoose = require('mongoose')

// Configs
const config = require('./config/config')

// Routes
const routes = require('./routes')

const app = express()

// set security HTTP headers
app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Data sanitization against XSS
app.use(xss())

// Implement CORS
app.use(cors());
app.options('*', cors());

app.use('/api', routes)

// Contect to database
mongoose.connect(config.db.url).then((result) => {
    app.listen(config.server.port)
    console.log(`Server is listening  on port ${config.server.port}`);
})