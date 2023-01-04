const Order = require('../models/Order');
const mongoose = require('mongoose');
const { response, json } = require('express');

//get all orders
const getAllOrders = async(req,res)=>{
    const orders = await Order.find({}).sort({createdAt:-1})
    res.status(200).json(orders)
}


//create new order
const createOrder = async(req,res)=>{
    const{email,date,cart,totalPrice} = req.body
    //add doc to db
    try{
        const order = await Order.create({email,date,cart,totalPrice})
        res.status(200).json(order)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = {
    getAllOrders,
    createOrder,
}

