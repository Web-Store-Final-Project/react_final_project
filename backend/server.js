require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios');
const itemRoutes = require('./routes/itemsRout.js')
const userRoutes = require('./routes/userRout')

const cheerio = require('cheerio')

// express app
const app = express()

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    next()
})

//routes
app.use('/api/items' ,itemRoutes)
app.use('/api/users' ,userRoutes)

const url = 'https://www.burton.com/us/en/c/mens-snowboards?start=0&sz=24'

const itemsArr = []

axios(url).then(response =>{
    const html =  response.data
    const $ =  cheerio.load(html)

    $('.product-tile' ,html).each(function(){
        const title = $(this).find('.product-name').text()
        const price = $(this).find('.standard-price').text()
        const imgSrc = $(this).find('.product-image').attr('src')
        const urlDescription = $(this).find('a').attr('href')

        if(title !== "" && price !== "" && imgSrc !== ""){
            itemsArr.push({
                title,
                price,
                imgSrc,
                urlDescription
            })
        }
    })
        
}).catch(err => console.log(err))



//scraping from burton
    

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
