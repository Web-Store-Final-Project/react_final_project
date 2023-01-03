const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const itemModel = require('../models/itemModel')
const Item = require('../models/itemModel')

const url = 'https://www.quiksilver.com/mens-boardshorts/'
const itemsArr = []
async function getScrapedData(){

    axios(url).then(response =>{
        const html =  response.data
        const $ =  cheerio.load(html)
    
        $('.product.producttile',html).each(function(){
            const tempTitle = $(this).find('.name').text()
            const tempPrice = $(this).find('.salesprice').text()
            const imgSrc1 = $(this).find('.r-tile-product-image').find('source').attr('srcset')
            const imgSrc2 = $(this).find('.r-tile-product-image--rollover').find('source').attr('srcset')
            const title = tempTitle.replace(/\n/g, '').trim()
            const price =  tempPrice.replace(/\n/g, '').replace("$","").trim()

            itemsArr.push({
                title,
                price,
                imgSrc1,
                imgSrc2
            })
        }) 
        itemsArr.forEach(item => {
            postItem(item)
        });

        async function postItem(item){
            mongoose.connect(process.env.MONGO_URI)
            const myItem = new Item({
                title:item.title,
                price:item.price,
                imgPath1:item.imgSrc1,
                imgPath2:item.imgSrc2,
                scrippedSiteName:'QUIKSILVER',
                brand:'QUIKSILVER',
                date:Date.now()
            })
            await myItem.save()
        }
    });
    
} 
module.exports = getScrapedData