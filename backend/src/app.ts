import express from "express"
// To access the .env variables
import {config} from"dotenv"
import morgan from "morgan" 
import appRouter from "./routes/index.js"
import cookieParser from "cookie-parser"
config()
const app=express()
//middlewares
app.use(express.json())
//
app.use(cookieParser(process.env.COOKIE_SECRET))

// For log information , we remove it in the production 
app.use(morgan('dev'))

app.use("/api/v1",appRouter)
export default app 