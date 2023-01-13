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
    const{email,date,time,cart,totalPrice} = req.body
    //add doc to db
    try{
        const order = await Order.create({email,date,time,cart,totalPrice})
        res.status(200).json(order)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
const getOrderByUserEmail = async (req,res)=>{
    const email = req.params.email;
    const order = await Order.find({email:email})
    if(!order){
        return res.status(404).json({err:'No such order'})
    }else{
        res.status(200).json(order);
    }
}
const getOrderPerDate = async(req,res)=>{
    const doc = await Order.aggregate([
        {$group:{_id: "$date",count: {$sum:1}}},
    ]);
    console.log(doc);
    res.status(200).json(doc);
}
module.exports = {
    getAllOrders,
    createOrder,
    getOrderByUserEmail,
    getOrderPerDate
}

