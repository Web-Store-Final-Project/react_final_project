const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Item =  require('../models/itemModel')

const url = 'https://www.billabong.com/mens-tshirts/'
const itemsArr = []
async function getScrapedData(){
    console.log("-------------------")
    axios(url).then(response =>{
        const html =  response.data
        const $ =  cheerio.load(html)

        $('.producttileinner' ,html).each(function(){
            const tempTitle = $(this).find('img').attr('aria-labelledby')
            const tempPrice = $(this).find('.salesprice').text()
            const imgSrc = $(this).find('img').attr('src')


            const price =  tempPrice.replace(/\n/g, '').replace("$","").trim()
            const title = tempTitle.replace('View Product ','')
            if(title !== "" && price !== "" && imgSrc !== ""){
                itemsArr.push({
                    title,
                    price,
                    imgSrc
                })
            }
        })   
        console.log(itemsArr)
        console.log("================ " + itemsArr.length  + " scraped billabong's items" + " ================") 
        itemsArr.forEach(item => {
            // postItem(item)
        });

        async function postItem(item){
            mongoose.connect(process.env.MONGO_URI)
            const myItem = new Item({
                title:item.title,
                price:item.price,
                imgPath:item.imgSrc
            })
            console.log(myItem)
            await myItem.save()
        }
    });  
} 
module.exports = getScrapedData