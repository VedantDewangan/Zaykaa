const { Cart } = require("../Database/Model/CartModel");
const { Orders } = require("../Database/Model/OrdersModel")

const placeOrder = async (req,res)=>{
    try {
        const {userId,cart,amt} = req.body;
        const foodIds = cart.map(item=>item.itemDetails._id);
        const order = await Orders.create({
            userDetail:userId,
            foodDetail:foodIds,
            amount:amt,
            status:"Preparing Food"
        })
        
        await Cart.deleteMany({ userDetails: userId });

        res.status(201).json({
            msg:"Order place successfully",
            success:true,
            order:order
        })
        
    } catch (error) {
        console.log('Error in the place Order');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in backend (placeOrder)"
        })
    }
}

const getAllOrder = async (req,res)=>{
    try {
        const {id} = req.query;

        const order = await Orders.find({
            userDetail:id
        }).populate('foodDetail');

        res.status(200).json({
            success:true,
            order:order
        })
    } catch (error) {
        console.log('Error in the get Order');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in backend (getOrder)"
        })   
    }
}

const getAdminOrder = async (req,res)=>{
    try {
        const order = await Orders.find({
            delivered:true
        }).populate('foodDetail').populate('userDetail');

        res.status(200).json({
            success:true,
            order:order
        })
    } catch (error) {
        console.log('Error in the get Admin Order');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in backend (getAdminOrder)"
        })   
    }
}

const getAllNotDeliveredOrder = async (req,res)=>{
    try {
        const order = await Orders.find({
            delivered:false
        }).populate('foodDetail').populate('userDetail');

        res.status(200).json({
            success:true,
            order:order
        })
    } catch (error) {
        console.log('Error in the get Admin Order');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in backend (getAdminOrder)"
        })   
    }
}

const updateOrder = async (req,res)=>{
    try {
        const {id,NewStatus,delivery} = req.body;

        await Orders.findByIdAndUpdate(id,{
            status:NewStatus,
            delivered:delivery
        })

        res.status(200).json({
            success:true
        })
    } catch (error) {
        console.log('Error in the get Update Order');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in backend (updateOrder)"
        })  
    }
}

module.exports = {
    placeOrder,
    getAllOrder,
    getAdminOrder,
    getAllNotDeliveredOrder,
    updateOrder
}