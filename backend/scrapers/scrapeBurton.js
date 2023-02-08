const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Item = require('../models/itemModel')

const firstUrl = 'https://www.burton.com/us/en/c/mens-t-shirts'
const secondUrl = 'https://www.burton.com/us/en/c/mens-hoodies-sweatshirts'
const thirdUrl = 'https://www.burton.com/us/en/c/mens-snowboard-jackets'

async function getScrapedData(){

    scrapeByUrl(firstUrl,"tshirt")
    scrapeByUrl(secondUrl,"sweatshirt")
    scrapeByUrl(thirdUrl,"jacket")

    function scrapeByUrl(url,category){
        const itemsArr = []

        axios(url).then(response =>{
            const html =  response.data
            const $ =  cheerio.load(html)
        
            $('.product-tile' ,html).each(function(){
                const title = $(this).find('.product-name').text()
                const price1 = $(this).find('.standard-price').text()
                const imgSrc1 = $(this).find('img').attr('src')
                const imgSrc2 = imgSrc1.replace("_4", "_5")
        
                const price = price1.replace("$","")
    
                if(title !== "" && price !== "" && imgSrc1 !== "" && imgSrc2 !== "" &&
                 imgSrc1 !== imgSrc2 && itemsArr.length < 12 ){
                    itemsArr.push({
                        title,
                        price,
                        category,
                        imgSrc1,
                        imgSrc2,
                    })
                }
            })   
            console.log(` ${itemsArr.length} ${category} scraped from burton`)
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
                    scrippedSiteName:'BURTON',
                    brand:'BURTON',
                    category:item.category,
                    date:Date.now()
                })
                await myItem.save()
            }
        });    
    }
    
} 
module.exports = getScrapedData