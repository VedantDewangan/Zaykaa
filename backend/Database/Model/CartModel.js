const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    itemDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food",
    },
    quantity:{
        type:Number,
        default:1
    }
})

const Cart = mongoose.model("Cart",CartSchema);

module.exports = {
    Cart
}