const { Cart } = require("../Database/Model/CartModel");

const getItemsInCart = async (req,res) => {
    try {
        const { userID } = req.query;

        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "userID are required",
            });
        }

        const cart = await Cart.find({
            userDetails:userID
        }).populate("itemDetails")

        res.status(200).json({
            success:true,
            message:"Item in the Cart",
            cart:cart
        })

    } catch (error) {
        console.error("Error in getItemsInCart:", error);
        return res.status(500).json({
            success: false,
            message: "Error in backend (getItemsInCart)",
        });   
    }
}

const addItemInCart = async (req,res) => {
    try {
        const {userID,itemID} = req.body;

        if (!userID || !itemID) {
            return res.status(400).json({
                success: false,
                message: "userID and itemID are required",
            });
        }

        await Cart.create({
            userDetails:userID,
            itemDetails:itemID
        })

        res.status(200).json({
            success:true,
            message:"Item Added To Cart"
        })

    } catch (error) {
        console.error("Error in addItemInCart:", error);
        return res.status(500).json({
            success: false,
            message: "Error in backend (addItemInCart)",
        });   
    }
}
const removeItemInCart = async (req,res) => {
    try {
        const {userID,itemID} = req.body;

        if (!userID || !itemID) {
            return res.status(400).json({
                success: false,
                message: "userID and itemID are required",
            });
        }

        await Cart.findOneAndDelete({
            userDetails:userID,
            itemDetails:itemID
        })

        res.status(200).json({
            success:true,
            message:"Item Removed From Cart"
        })

    } catch (error) {
        console.error("Error in removeItemInCart:", error);
        return res.status(500).json({
            success: false,
            message: "Error in backend (removeItemInCart)",
        });   
    }
}

module.exports = {
    getItemsInCart,
    addItemInCart,
    removeItemInCart
}
