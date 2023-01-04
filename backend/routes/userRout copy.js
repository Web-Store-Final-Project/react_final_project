
const express = require('express')
const{
    getAllOrders,
    createOrder,
} = require('../controllers/orderController')
const app = express();
const router = express.Router()

//GET all users
router.get('/',getAllOrders)

//POST a new user
router.post('/',createOrder)

module.exports = router