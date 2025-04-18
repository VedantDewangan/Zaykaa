const express = require("express");
const { 
    addFoodItem,
    getAllFoodItems,
    deleteFoodItem,
    addToBestSeller,
    deleteFromBestseller,
    getAllItemFromBestseller
 } = require("../Controller/FoodController");

const FoodRoute = express.Router();

FoodRoute.post("/food/add",addFoodItem);
FoodRoute.get("/food/getAllFoodItems",getAllFoodItems);
FoodRoute.delete("/food/deleteFoodItem",deleteFoodItem);
FoodRoute.post("/food/addToBestSeller",addToBestSeller);
FoodRoute.delete("/food/deleteFromBestseller",deleteFromBestseller);
FoodRoute.get("/food/getAllItemFromBestseller",getAllItemFromBestseller);

module.exports = { FoodRoute };