const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Item = require('../models/itemModel')

const url = 'https://www.horsefeathers.eu/mens/snowwear/jackets/'
const itemsArr = []
async function getScrapedData(){

    axios(url).then(response =>{
        const html =  response.data
        const $ =  cheerio.load(html)

        $('.catalog-outer' ,html).each(function(){
            const tempTitle = $(this).find('.title').text()
            const tempPrice = $(this).find('.price').text()
            const imgSrc = $(this).find('img').attr('src')


            const price =  tempPrice.replace(/\n/g, '').replace("€","").trim()
            const title = tempTitle.replace(/\n/g,'').trim()
            if(title !== "" && price !== "" && imgSrc !== ""){
                itemsArr.push({
                    title,
                    price,
                    imgSrc
                })
            }
        })   
        console.log(itemsArr)
        console.log("================ " + itemsArr.length  + " scraped horseFethers's items" + " ================")   
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