const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    foodName:{
        type:String,
        required:true
    },
    foodDescription:{
        type:String,
        required:true
    },
    foodPrice:{
        type:Number,
        required:true
    },
    foodImage:{
        type:String,
        required:true
    },
    foodCategory:{
        type:String,
        required:true
    }
});

const Food = mongoose.model("Food",FoodSchema);

module.exports = { Food };