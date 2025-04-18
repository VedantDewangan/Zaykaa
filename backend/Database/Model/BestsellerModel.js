const mongoose = require("mongoose");

const BestsellerSchema = new mongoose.Schema({
    item : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true
    }
});

const Bestseller = mongoose.model("Bestseller",BestsellerSchema);

module.exports = { Bestseller };