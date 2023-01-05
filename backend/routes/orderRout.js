const express = require('express')
const{
    getAllOrders,
    createOrder,
    getOrderByUserEmail
} = require('../controllers/orderController')
const app = express();
const router = express.Router()

//GET all orders
router.get('/',getAllOrders)

//POST a new order
router.post('/',createOrder)

//GET a single order by email
router.get('/:email',getOrderByUserEmail)


module.exports = router