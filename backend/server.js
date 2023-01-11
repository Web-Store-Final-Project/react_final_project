require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const itemRoutes = require('./routes/itemsRout.js')
const userRoutes = require('./routes/userRout')
const orderRoutes = require('./routes/orderRout.js')
const burtonScraper  = require('./scrapers/scrapeBurton.js')
const billabongScraper  = require('./scrapers/scrapeBillabong.js')
const quikScraper = require('./scrapers/scrapeQuiksilver.js')
const Item = require('./models/itemModel')
const User = require('./models/User');
var cors = require('cors')



// express app
const app = express()

//middleware
app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
    next()
})

//----------------------------------------//
//routes
app.use('/api/items' ,itemRoutes)
app.use('/api/users' ,userRoutes)
app.use('/api/orders' ,orderRoutes)

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
// billabongScraper.apply()
// quikScraper.app/ly()

async function checkForScrape(){
    const nowInMs = Date.now()
    const threeDaysInMs = 259200000
    
    const before3DaysMs = nowInMs - threeDaysInMs
    const scrapedItem = await Item.findOne({ scrippedSiteName: 'BURTON' }, 'date').exec();
    if(scrapedItem === null || scrapedItem.date < before3DaysMs){
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
   
        burtonScraper.apply()
        quikScraper.apply()
        billabongScraper.apply() 
    }
}
