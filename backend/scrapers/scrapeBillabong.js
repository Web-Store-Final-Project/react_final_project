const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Item =  require('../models/itemModel')

const firstUrlBilla = 'https://www.billabong.com/mens-tshirts/'
const SecondUrlBilla = 'https://www.billabong.com/mens-sweatshirts/'
const thirdUrlBilla ='https://www.billabong.com/mens-jackets/'

const firstUrlRVCA ='https://www.rvca.com/mens-tshirts/'
const secondUrlRVCA ='https://www.rvca.com/mens-sweatshirts/'
const thirdUrlRVCA ='https://www.rvca.com/mens-jackets/'


async function getScrapedData(){

    scrapeByUrl(firstUrlBilla,"tshirt","BILLABONG")
    scrapeByUrl(SecondUrlBilla,"sweatshirt","BILLABONG")
    scrapeByUrl(thirdUrlBilla,"jacket","BILLABONG")

    scrapeByUrl(firstUrlRVCA,"tshirt","RVCA")
    scrapeByUrl(secondUrlRVCA,"sweatshirt","RVCA")
    scrapeByUrl(thirdUrlRVCA,"jacket","RVCA")


    function scrapeByUrl(url,category,brand){
        const itemsArr = []
        axios(url).then(response =>{
            const html =  response.data
            const $ =  cheerio.load(html)
    
            $('.producttileinner' ,html).each(function(){
                const title = $(this).find('img').attr('title')

                const splitTitleArr = title.split(",");
                const finalTitle = splitTitleArr[1];

                const tempPrice = $(this).find('.salesprice').text()
                const imgSrc1 = $(this).find('img').attr('src')
                const imgSrc2 = imgSrc1.replace("frt" ,"bck")

                

                const price =  tempPrice.replace(/\n/g, '').replace("$","").trim()

                if(title !== "" && price !== "" && imgSrc1 !== "" && imgSrc2 !== "" && 
                imgSrc1 !== imgSrc2 && itemsArr.length < 12){
                    itemsArr.push({
                        finalTitle,
                        price,
                        category,
                        imgSrc1,
                        imgSrc2
                    })
                }
            })   
            console.log(`${itemsArr.length} ${category} scraped from ${brand}`)
            itemsArr.forEach(item => {
                postItem(item)
            });

            async function postItem(item){
                mongoose.connect(process.env.MONGO_URI)
                const myItem = new Item({
                    title:item.finalTitle,
                    price:item.price,
                    imgPath1:item.imgSrc1,
                    imgPath2:item.imgSrc2,
                    scrippedSiteName:brand,
                    brand:brand,
                    category:item.category,
                    date:Date.now()
                })
                await myItem.save()
            }
        });  
         
    }
} 
module.exports = getScrapedData