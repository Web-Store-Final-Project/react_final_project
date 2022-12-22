require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const itemRoutes = require('./routes/itemsRout.js')

// express app
const app = express()

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,res.path)
    next()
})

//routes
app.use('/api/items' ,itemRoutes)

//connect to db
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.PORT,()=>{
        console.log('connected to db & listening on port',process.env.PORT ,'!!');
    })
})
.catch((err)=>{
    console.log(err)
});

