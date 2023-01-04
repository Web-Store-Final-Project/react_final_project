const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    cart: {
        type: Array,
        require: true,
    }
})