require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const itemRoutes = require('./routes/itemsRout.js')
const userRoutes = require('./routes/userRout')
const scraper  = require('./scrapers/scrapeBurton.js')



// express app
const app = express()

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    next()
})

//----------------------------------------//
//routes
app.use('/api/items' ,itemRoutes)
app.use('/api/users' ,userRoutes)

const getUser = async(req,res)=>{
    const emailBody = req.body;
    const email = emailBody.email
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({err:'No such item'})
    }else{
        console.log(user);
        res.status(200).json(user);
    }
}


app.get("/profile/:email",getUser);

//scraping from burton
scraper.apply()    

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
