const mongoose = require("mongoose");

const OrdersModel = new mongoose.Schema({
    userDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    foodDetail: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
            required: true
        }
    ],
    amount: {
        type: Number,
        required: true 
    },
    delivered: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        required: true
    }
},{
    timestamps:true
});

const Orders = mongoose.model("Orders", OrdersModel);

module.exports = {
    Orders
};
