const express = require('express')
const app = express()
const registerRouter = require('./controllers/manual-auth/register')
const productRouter = require('./controllers/product')
const categoryRouter = require('./controllers/category')
const middleware = require('./utils/middleware')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const cookieParser = require('cookie-parser')

const sessionRouter = require('./controllers/google-auth/googleAuth')
const userRouter = require('./controllers/user')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use(cookieParser())

app.use(fileUpload({
    useTempFiles: true
}))

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)


app.use('/api/manual-register', registerRouter)

app.use('/api/products', productRouter)
app.use('/api/category', categoryRouter)
app.use('/api/sessions', sessionRouter)
app.use('/api/login-user', userRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app