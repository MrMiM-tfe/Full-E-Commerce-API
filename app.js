// Packages
const http = require("http")
const https = require("https")
const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const apiDoc = require('./docs/bundle/doc.json')

// Middlewares
const { logToConsole } = require('./middlewares/logging')

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


// use middlewares
app.use(logToConsole)

app.use('/',swaggerUi.serve)
app.get('/', swaggerUi.setup(apiDoc))

// implement routes
app.use('/api', routes)

// Contect to database
mongoose.connect(config.db.url).then((result) => {
    app.listen(config.server.port)
    https.createServer(app).listen(config.server.httpsPort, () => {
        console.log(`https Server is listening  on port ${config.server.httpsPort}`);
    })
    console.log(`Server is listening  on port ${config.server.port}`);
})