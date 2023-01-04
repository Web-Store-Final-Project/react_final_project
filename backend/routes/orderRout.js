
const express = require('express')
const{
    getAllOrders,
    createOrder,
} = require('../controllers/orderController')
const app = express();
const router = express.Router()

//GET all orders
router.get('/',getAllOrders)

//POST a new order
router.post('/',createOrder)

module.exports = router