const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
    },
    totalPrice: {
        type:Number,
        required:true,
    }
})
module.exports = mongoose.model('Order',orderSchema);
