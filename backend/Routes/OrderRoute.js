const express = require("express");
const { placeOrder, getAllOrder, getAdminOrder, getAllNotDeliveredOrder,updateOrder } = require("../Controller/OrderController");

const OrderRoute = express.Router();

OrderRoute.post("/order/placeOrder",placeOrder);
OrderRoute.get("/order/getOrder",getAllOrder);
OrderRoute.get("/order/getAdminOrder",getAdminOrder);
OrderRoute.get("/order/getNotDeliveredFood",getAllNotDeliveredOrder);
OrderRoute.put("/order/updateOrder",updateOrder);

module.exports = { OrderRoute };