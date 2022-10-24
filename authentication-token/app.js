require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const userRouter = require('./routes/userRoutes')
const connectDB = require('./shared-services/db')
const morgan = require('morgan')
const cors = require('cors')
const port = process.env.PORT || 3000
// error handler
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))
app.use('/api/v1/auth', userRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Live : http://localhost:${port}`))
    } catch (error) {
        console.log(`Something went wrong please check again : ${error}`)
    }
}

start()