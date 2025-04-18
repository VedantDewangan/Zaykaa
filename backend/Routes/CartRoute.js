const express = require("express");
const { getItemsInCart, addItemInCart, removeItemInCart } = require("../Controller/CartController");

const CartRoute = express.Router();

CartRoute.get("/cart/getItemsInCart", getItemsInCart);
CartRoute.post("/cart/addItemInCart", addItemInCart);
CartRoute.delete("/cart/removeItemInCart", removeItemInCart);

module.exports = { CartRoute };