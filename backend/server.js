import express from 'express'
import cors from 'cors'
import 'dotenv/config'


// app config
const app = express()
const port = process.env.PORT || 4000

// middlewears

app.use(express.json())
// basically cors is used for frontend to connect to backend
app.use(cors())

// api endpoints
app.get('/',(req,res) =>{
  res.send('API working ')
})

app.listen(port,()=> console.log('server started', port))