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
    const emailBody = req.body;
    const email = emailBody.email
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({err:'No such item'})
    }else{
        console.log(user);
        res.status(200).json(user);
    }
}

//create new item
const createUser = async(req,res)=>{
    const{fullname,email,password} = req.body
    const isAdmin = false;
    //add doc to db
    try{
        const user = await User.create({fullname,email,password,isAdmin})
        res.status(200).json(user)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

//delete an item

module.exports = {
    getAllUsers,
    getUser,
    createUser,
}

