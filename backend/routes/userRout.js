
const express = require('express')
const{
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
} = require('../controllers/userController')
const app = express();
const router = express.Router()

//GET all users
router.get('/',getAllUsers)

//GET a single user by email
router.post('/',getUser)

//POST a new user
router.post('/',createUser)

module.exports = router