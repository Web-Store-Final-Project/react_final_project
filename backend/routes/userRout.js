
const express = require('express')
const{
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
} = require('../controllers/userController')

const router = express.Router()

//GET all users
router.get('/',getAllUsers)

//GET a single user by Id
router.get('/:id',getUser)

//POST a new user
router.post('/',createUser)

module.exports = router