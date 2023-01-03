const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    price:{
        type:String,
        required:true
    },
    imgPath1:{
        type:String,
        required:true
    },
    imgPath2:{
        type:String,
        required:false
    },
    scrippedSiteName:{
        type:String,
        required:false,
    },
    brand:{
        type:String,
        required:true,
    },
    date: {
        type: String,
        required: false,
      },
}, {timestamps:true})

module.exports = mongoose.model('item',itemSchema)