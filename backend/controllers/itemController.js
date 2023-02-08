const Item = require("../models/itemModel");
const mongoose = require("mongoose");
const { response, json } = require("express");
const itemModel = require("../models/itemModel");

//get all items
const getAllItems = async (req, res) => {
  const items = await Item.find({}).sort({ createdAt: -1 });

  res.status(200).json(items);
};

//get single item
const getSingleItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such item" });
  }

  const item = await Item.findById(id);

  if (!item) {
    return res.status(404).json({ err: "No such item" });
  }

  res.status(200).json(item);
};

//Get filtere Items
const getFilteredItem = async (req, res) => {
  const query = {
    price: {
      $gte: req.params.priceMin,
      $lte: req.params.priceMax,
    },
  };

  if (req.params.title !== "All") {
    query["$or"] = [
      { title: { $regex: `${req.params.title}`, $options: "i" } },
      { brand: { $regex: `${req.params.title}`, $options: "i" } },
      { category: { $regex: `${req.params.title}`, $options: "i" } },
    ];
  }

  if (req.params.brand !== "All") {
    query["brand"] = { $regex: `^${req.params.brand}`, $options: "i" };
  }

  if (req.params.category !== "All") {
    query["category"] = { $regex: `^${req.params.category}`, $options: "i" };
  }

  const item = await Item.find(query)
    .sort({ createdAt: -1 })
    .collation({ locale: "en", strength: 2 });
  if (!item) {
    return res.status(404).json({ err: "No such items" });
  } else {
    res.status(200).json(item);
  }
};

//create new item
const createItem = async (req, res) => {
  const { title, price, brand, category, imgPath1, imgPath2, date } = req.body;

  let emptyFields = [];

  //check if user didn't insert all input to fields
  if (!title) {
    emptyFields.push("title");
  }
  if (!brand) {
    emptyFields.push("brand");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!imgPath1) {
    emptyFields.push("imgPath1");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });
  }

  //add doc to db
  try {
    const item = await Item.create({
      title,
      price,
      brand,
      category,
      imgPath1,
      imgPath2,
      date,
    });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete an item
const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such item" });
  }

  const item = await Item.findOneAndDelete({ _id: id });

  if (!item) {
    res.status(404).json({ err: "No such item" });
  }

  res.status(200).json(item);
};

//update an item
const updateItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such item" });
  }

  const item = await Item.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!item) {
    res.status(404).json({ err: "No such item" });
  }

  res.status(200).json(item);
};

module.exports = {
  getAllItems,
  getSingleItem,
  getFilteredItem,
  createItem,
  deleteItem,
  updateItem,
};
