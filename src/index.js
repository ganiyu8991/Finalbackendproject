 
 import express from 'express'

 import userRouter from './Routes/userRoute.js'

 import dotenv from 'dotenv'

 import mongoose from 'mongoose'

 import cors from 'cors'

 import cookieParser from 'cookie-parser'

 import bodyParser from 'body-parser'



 dotenv.config()
 const app = express()

 const PORT = 3000

 mongoose.connect(process.env.MONGODB_URI).then(() => {

    console.log('Database connected!')

}).catch((err) => console.error(err))

 app.use(express.json())
 app.use(cookieParser())
 app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}))
 app.use(express.urlencoded({extended: true}))
 app.use(userRouter)
 

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})