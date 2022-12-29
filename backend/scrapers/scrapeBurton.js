const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://www.burton.com/us/en/c/mens-apparel-accessories?start=0&sz=24'
const itemsArr = []
async function getScrapedData(){
    axios(url).then(response =>{
        const html =  response.data
        const $ =  cheerio.load(html)
    
        $('.product-tile' ,html).each(function(){
            const title = $(this).find('.product-name').text()
            const price = $(this).find('.standard-price').text()
            const imgSrc = $(this).find('.product-image').attr('src')
    
            if(title !== "" && price !== "" && imgSrc !== ""){
                itemsArr.push({
                    title,
                    price,
                    imgSrc
                })
            }
        })   
        console.log(itemsArr)
    });
    
    
} 
module.exports = getScrapedData


// var fs = require('fs')

// const Data = JSON.stringify(itemsArr)
        // console.log(Data);


//     fs.appendFile('scraped.json',Data,(err)=>{
    //         console.log(err)
    //     })
    // }).catch(err=>console.log(err))

    // fs.readFile('scraped.json', 'utf8', function(err, data){
      
    //     console.log(data);
        
