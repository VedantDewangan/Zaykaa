const { Bestseller } = require("../Database/Model/BestsellerModel");
const { Food } = require("../Database/Model/FoodModel");

const addFoodItem = async (req,res)=>{
    try {
        const {name,description,price,image,category} = req.body;

        if(!name){
            return res.status(400).json({
                success:false,
                message:"Please Provide the name"
            })
        }

        if(!description){
            return res.status(400).json({
                success:false,
                message:"Please Provide the description"
            })
        }

        if(!price){
            return res.status(400).json({
                success:false,
                message:"Please Provide the price"
            })
        }

        if(!image){
            return res.status(400).json({
                success:false,
                message:"Please Provide the image link"
            })
        }

        if(!category){
            return res.status(400).json({
                success:false,
                message:"Please Provide the category"
            })
        }

        const food_exist = await Food.find({
            foodName:name
        });

        if(food_exist.length>0){
            return res.status(400).json({
                success:false,
                message:"Food already exist"
            })
        }

        await Food.create({
            foodName:name,
            foodDescription:description,
            foodPrice:price,
            foodImage:image,
            foodCategory:category
        })

        return res.status(201).json({
            success:true,
            message:"Food Added Successfully",
        });
        
    } catch (error) {
        console.log('Error in the addFoodItem');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in backend (addFoodItem)"
        })
    }
}

const getAllFoodItems = async (req,res)=>{
    try {
        const foodItems = await Food.find();
        res.status(200).json({
            success:true,
            data:foodItems
        })
    } catch (error) {
        console.log('Error in the getAllFoodItems');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in backend (getAllFoodItems)"
        })
    }
}

const deleteFoodItem = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide the ID of the food item to delete",
            });
        }

        // Check if food item exists before deleting
        const foodItem = await Food.findById(id);
        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item not found",
            });
        }

        // Delete food item from menu
        await Food.findByIdAndDelete(id);

        // Delete food item from Bestseller if it exists
        await Bestseller.findOneAndDelete({ item: id });

        return res.status(200).json({
            success: true,
            message: "Food item deleted successfully from menu and bestseller (if present)",
        });

    } catch (error) {
        console.log("Error in deleteFoodItem:", error);
        return res.status(500).json({
            success: false,
            message: "Error in backend (deleteFoodItem)",
        });
    }
};


const addToBestSeller = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide the ID of the food item to add",
            });
        }

        const foodItem = await Food.findById(id);
        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item not found",
            });
        }

        const data = await Bestseller.find({ item: id });
        if (data.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Food item is already in the Bestseller list",
            });
        }

        await Bestseller.create({ item: id });

        return res.status(200).json({
            success: true,
            message: "Food item added to Bestseller successfully",
        });
    } catch (error) {
        console.error("Error in addToBestSeller:", error);
        return res.status(500).json({
            success: false,
            message: "Error in backend (addToBestSeller)",
        });
    }
};

const deleteFromBestseller = async (req,res)=>{
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide the ID of the food item to add",
            });
        }

        await Bestseller.findOneAndDelete({
            item:id
        });

        return res.status(200).json({
            success: true,
            message: "Food item removed from Bestseller successfully",
        });
    } catch (error) {
        console.error("Error in deleteFromBestseller:", error);
        return res.status(500).json({
            success: false,
            message: "Error in backend (deleteFromBestseller)",
        });
    }
}

const getAllItemFromBestseller = async (req,res)=>{
    try {
        const data = await Bestseller.find().populate("item");

        return res.status(200).json({
            success: true,
            message: "Food item added which are Bestseller",
            details:data
        });
    } catch (error) {
        console.error("Error in getAllItemFromBestseller:", error);
        return res.status(500).json({
            success: false,
            message: "Error in backend (getAllItemFromBestseller)",
        });
    }
}

module.exports = {
    addFoodItem,
    getAllFoodItems,
    deleteFoodItem,
    addToBestSeller,
    deleteFromBestseller,
    getAllItemFromBestseller
}