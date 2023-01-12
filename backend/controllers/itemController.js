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
  const title = req.params.title;
  const priceMin = req.params.priceMin;
  const priceMax = req.params.priceMax;
  if (title != "ALL") {
    const item = await Item.find({
      $and: [
        { price: { $gt: priceMin } },
        { price: { $lt: priceMax } },
        {
          $or: [
            { title: { $regex: title, $options: "i" } },
            { brand: { $regex: title, $options: "i" } },
            { category: { $regex: title, $options: "i" } },
          ],
        },
      ],
    }).collation({ locale: "en", strength: 2 });
    if (!item) {
      return res.status(404).json({ err: "No such items" });
    } else {
      res.status(200).json(item);
    }
  } else {
    const item = await Item.find({
      $and: [{ price: { $gt: priceMin } }, { price: { $lt: priceMax } }],
    }).collation({ locale: "en", strength: 2 });
    if (!item) {
      return res.status(404).json({ err: "No such items" });
    } else {
      res.status(200).json(item);
    }
  }
};

//create new item
const createItem = async (req, res) => {
  const { title, description, price, imgPath, date } = req.body;

  let emptyFields = [];

  //check if user didn't insert all input to fields
  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!imgPath) {
    emptyFields.push("imgPath");
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
      description,
      price,
      imgPath,
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
