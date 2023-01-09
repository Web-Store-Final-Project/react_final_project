const express = require("express");
const {
  getAllItems,
  getSingleItem,
  getFilteredItem,
  getBrandList,
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemController");

const router = express.Router();

//GET all items
router.get("/", getAllItems);

//GET a single item by Id
router.get("/:id", getSingleItem);

//GET filtered items
router.get("/search/:title", getFilteredItem);

//GET brand list
router.get("/brandsList/", getBrandList);

//POST a new item
router.post("/", createItem);

//DELETE an item
router.delete("/:id", deleteItem);

//UPDATE an item
router.patch("/:id", updateItem);

module.exports = router;
