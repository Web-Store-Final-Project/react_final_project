const User = require("../models/User");
const mongoose = require("mongoose");
const { response, json } = require("express");

//get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};
const getAllActiveUsers = async (req, res) => {
  const users = await User.find({ isOnline: true }).sort({ createdAt: -1 });
  res.status(200).json(users);
};
//get single item
const getUser = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ err: "No such item" });
  } else {
    res.status(200).json(user);
  }
};

//create new item
const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  const isAdmin = false;
  const isOnline = false;
  //add doc to db
  try {
    const user = await User.create({
      fullname,
      email,
      password,
      isAdmin,
      isOnline,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const setOnlineStatus = async (req, res) => {
  const { email, isOnline } = req.body;
  try {
    const user = await User.findOne({ email: email });
    //const status = user.isOnline
    const updated = await User.findOneAndUpdate(
      { email: email },
      { isOnline: isOnline }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete an item

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  setOnlineStatus,
  getAllActiveUsers,
};
