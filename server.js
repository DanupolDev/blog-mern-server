const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRoute = require('./routes/blog')
const autRoute = require('./routes/auth')

require('dotenv').config()

const app = express()


//connect cloud databas
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>console.log('เชื่อมต่อฐานข้อมูล'))
.catch((err)=>console.log(err))

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//route
app.use('/api',blogRoute)
app.use('/api',autRoute)

const port = process.env.PORT || 8080

app.listen(port,()=>console.log(`start server in port: ${port}`))