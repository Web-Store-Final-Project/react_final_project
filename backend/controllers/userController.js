const User = require('../models/User');
const mongoose = require('mongoose');
const { response, json } = require('express');

//get all users
const getAllUsers = async(req,res)=>{
    const users = await User.find({}).sort({createdAt:-1})

    res.status(200).json(users)
}

//get single item
const getUser = async(req,res)=>{
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'No such item'})
    }

    const user = await User.findById(id)

    if(!user){
        return res.status(404).json({err:'No such item'})
    }
    res.status(200).json(user)
}

//create new item
const createUser = async(req,res)=>{
    const{fullname,email,password} = req.body
    const isAdmin = false;
    //add doc to db
    try{
        const user = await User.create({fullname,email,password,isAdmin})
        res.status(200).json(item)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

//delete an item
const deleteUser = async(req,res)=>{
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


module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser
}

