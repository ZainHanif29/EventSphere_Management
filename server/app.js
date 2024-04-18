// import dep
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

// import file 
import connectDB from './config/dbconnect.js'
import Route from './routes/userRoutes.js'

// midllerwares
const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT
const dbURL = process.env.DATABASE_URI
const dbName = process.env.DATABASE_NAME
connectDB(dbURL,dbName)


app.use('/api',Route)

app.listen(port,()=>{
    console.log(`Server is running this port ${'http://localhost:3000'}/api/`)
})