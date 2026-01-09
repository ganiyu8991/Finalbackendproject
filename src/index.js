 
 import express from 'express'

 import userRouter from './Routes/userRoute.js'

 import dotenv from 'dotenv'

 import mongoose, { connect } from 'mongoose'

 import cors from 'cors'

 import cookieParser from 'cookie-parser'

 import bodyParser from 'body-parser'

 import { connectDB } from './config/DB.js'



 dotenv.config()
 const app = express()

 const PORT = 3000
await connectDB()
 app.use(express.json())
 app.use(cookieParser())
 app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}))
 app.use(express.urlencoded({extended: true}))
 app.use(userRouter)

 if(process.env.NODE_ENV !== 'production'){
    app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

 }
 
export default app;
