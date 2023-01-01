const axios = require('axios')
const cheerio = require('cheerio')

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


            const price =  tempPrice.replace(/\n/g, '').trim()
            const title = tempTitle.replace(/\n/g,'').trim()
            itemsArr.push({
                title,
                price,
                imgSrc
            })
        })   
        console.log(itemsArr)
        console.log("================ " + itemsArr.length  + " scraped horseFethers's items" + " ================")   
     });
    
} 
module.exports = getScrapedData