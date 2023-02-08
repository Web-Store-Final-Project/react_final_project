const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imgPath1: {
      type: String,
      required: true,
    },
    imgPath2: {
      type: String,
      required: false,
    },
    scrippedSiteName: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("item", itemSchema);
