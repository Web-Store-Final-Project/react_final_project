const Item = require('../models/itemModel')
const mongoose = require('mongoose')

//get all items
const getAllItems = async(req,res)=>{
    const items = await Item.find({}).sort({createdAt:-1})

    res.status(200).json(items)
}

//get single item
const getSingleItem = async(req,res)=>{
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'No such item'})
    }

    const item = await Item.findById(id)

    if(!item){
        return res.status(404).json({err:'No such item'})
    }

    res.status(200).json(item)
}

//create new item
const createItem = async(req,res)=>{
    const{title,description,price,imgPath,date} = req.body
    //add doc to db
    try{
        const item = await Item.create({title,description,price,imgPath,date})
        res.status(200).json(item)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

//delete an item
const deleteItem = async(req,res)=>{
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'No such item'})
    }

    const item = await Item.findOneAndDelete({_id:id})

    if(!item){
        res.status(404).json({err:'No such item'})
    }

    res.status(200).json(item)
}

//update an item
const updateItem = async (req,res)=>{
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'No such item'})
    }

    const item = await Item.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!item){
        res.status(404).json({err:'No such item'})
    }

    res.status(200).json(item)

}


module.exports = {
    getAllItems,
    getSingleItem,
    createItem,
    deleteItem,
    updateItem}

