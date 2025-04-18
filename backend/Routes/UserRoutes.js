const express = require("express");
const { 
    userRegister, 
    userLogin
} = require("../Controller/UserController");

const UserRoute = express.Router();

UserRoute.post("/user/register",userRegister);
UserRoute.post("/user/login",userLogin);

module.exports = {UserRoute};