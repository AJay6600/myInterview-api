const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./router/userRoute')


const app = express()
app.use(cors())
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/user',userRoute);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on ${process.env.PORT} port`)
    })
})
.catch((e)=>{
    console.log(e)
})
    

