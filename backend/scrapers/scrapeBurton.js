const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Item = require('../models/itemModel')

const url = 'https://www.burton.com/us/en/c/mens-apparel-accessories?start=0&sz=24'
const itemsArr = []
async function getScrapedData(){
    axios(url).then(response =>{
        const html =  response.data
        const $ =  cheerio.load(html)
    
        $('.product-tile' ,html).each(function(){
            const title = $(this).find('.product-name').text()
            const price1 = $(this).find('.standard-price').text()
            const imgSrc = $(this).find('.product-image').attr('src')
    
            const price = price1.replace("$","")

            if(title !== "" && price !== "" && imgSrc !== ""){
                itemsArr.push({
                    title,
                    price,
                    imgSrc
                })
            }
        })   
        console.log(itemsArr)
        console.log("================ " + itemsArr.length  + " scraped burton's items" + " ================") 

        itemsArr.forEach(item => {
            // postItem(item)
        });

        async function postItem(item){
            mongoose.connect(process.env.MONGO_URI)
            const myItem = new Item({
                title:item.title,
                price:item.price,
                imgPath:item.imgSrc,
                scrippedSiteName:'BURTON',
                date:Date.now()
            })
            console.log(myItem)
            await myItem.save()
        }
    });
} 
module.exports = getScrapedData