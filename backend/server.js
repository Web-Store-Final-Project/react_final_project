require('dotenv').config()

const express = require('express')
const itemRoutes = require('./routes/items.js')

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

//listen for requests
app.listen(process.env.PORT,()=>{
    console.log('listening on port 4000!');
})

