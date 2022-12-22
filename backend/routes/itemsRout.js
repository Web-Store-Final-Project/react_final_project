
const express = require('express')
const{
    getAllItems,
    getSingleItem,
    createItem,
    deleteItem,
    updateItem,
} = require('../controllers/itemController')

const router = express.Router()

//GET all items
router.get('/',getAllItems)

//GET a single item by Id
router.get('/:id',getSingleItem)

//POST a new item
router.post('/',createItem)

//DELETE an item
router.delete('/:id',deleteItem)

//UPDATE an item
router.patch('/:id',updateItem)

module.exports = router