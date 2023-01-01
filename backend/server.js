require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const itemRoutes = require('./routes/itemsRout.js')
const userRoutes = require('./routes/userRout')
const burtonScraper  = require('./scrapers/scrapeBurton.js')
const billabongScraper  = require('./scrapers/scrapeBillabong.js')
const horseFeathersScraper  = require('./scrapers/scrapeHorsefeathers.js')

const User = require('./models/User');



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

//scraping from burton
burtonScraper.apply()    
billabongScraper.apply()    
horseFeathersScraper.apply()    

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
