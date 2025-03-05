import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewears

app.use(express.json())
// basically cors is used for frontend to connect to backend
app.use(cors())

// api endpoints

app.use('/api/admin', adminRouter)
app.get('/',(req,res) =>{
  res.send('API working ')
})

app.listen(port,()=> console.log('server started', port))