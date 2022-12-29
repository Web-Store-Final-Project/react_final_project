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
        type:Number,
        required:true
    },
    imgPath:{
        type:String,
        required:true
    },
    date: {
        type: String,
        required: false,
      },
}, {timestamps:true})

module.exports = mongoose.model('item',itemSchema)