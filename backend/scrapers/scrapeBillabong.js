const axios = require('axios')
const cheerio = require('cheerio')

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


            const price =  tempPrice.replace(/\n/g, '').trim()
            const title = tempTitle.replace('View Product ','')
            itemsArr.push({
                title,
                price,
                imgSrc
            })
        })   
        console.log(itemsArr)
        console.log("================ " + itemsArr.length  + " scraped billabong's items" + " ================")   
     });
    
} 
module.exports = getScrapedData