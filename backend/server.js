require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const itemRoutes = require('./routes/itemsRout.js')
const userRoutes = require('./routes/userRout')
const burtonScraper  = require('./scrapers/scrapeBurton.js')
const billabongScraper  = require('./scrapers/scrapeBillabong.js')
const quikScraper = require('./scrapers/scrapeQuiksilver.js')
const Item = require('./models/itemModel')
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

//scraping once a week
checkForScrape()

async function checkForScrape(){
    const nowInMs = Date.now()
    const weekInMs = 604800000
    
    const beforeWeekMs = nowInMs - weekInMs
    const scrapedItem = await Item.findOne({ scrippedSiteName: 'BURTON' }, 'date').exec();
    if(scrapedItem === null || scrapedItem.date < beforeWeekMs){
        Item.deleteMany({scrippedSiteName:'BURTON'},function(err){
            if(err) console.log(err)
            console.log("deleted successfuly")
        })
        Item.deleteMany({scrippedSiteName:'QUIKSILVER'},function(err){
            if(err) console.log(err)
            console.log("deleted successfuly")
        })
        Item.deleteMany({scrippedSiteName:'BILLABONG'},function(err){
            if(err) console.log(err)
            console.log("deleted successfuly")
        })

        billabongScraper.apply()    
        burtonScraper.apply()
        quikScraper.apply()
    }
}
