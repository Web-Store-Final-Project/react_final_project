const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    imgPath:{
        type:String,
        require:true
    },
    date: {
        type: String,
        required: true,
      },
}, {timestamps:true})

module.exports = mongoose.model('item',itemSchema)