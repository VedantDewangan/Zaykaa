const { User } = require("../Database/Model/UserModel");
const bcrypt = require("bcryptjs");

const userRegister = async (req,res)=>{
    try {
        const {name,email,password} = req.body;

        if(!name){
            return res.status(400).json({
                success:false,
                message:"Please Provide the name"
            })
        }

        if(!email){
            return res.status(400).json({
                success:false,
                message:"Please Provide the email"
            })
        }

        if(!password){
            return res.status(400).json({
                success:false,
                message:"Please Provide the password"
            })
        }

        const user_exist = await User.find({
            userEmail:email
        });

        if(user_exist.length>0){
            return res.status(400).json({
                success:false,
                message:"Email already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password,12);

        const new_User = await User.create({
            userName:name,
            userEmail:email,
            userPassword:hashedPassword
        })

        return res.status(201).json({
            success:true,
            message:"User Registred Successfully",
            userDetails:{
                id:new_User._id,
                name:new_User.userName,
                email:new_User.userEmail
            }
        });

    } catch (error) {
        console.log('Error in the userRegister');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in backend (userRegister)"
        })
    }
}

const userLogin = async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email){
            return res.status(400).json({
                success:false,
                message:"Please Provide the email"
            })
        }

        if(!password){
            return res.status(400).json({
                success:false,
                message:"Please Provide the password"
            })
        }

        const user_exist = await User.find({
            userEmail:email
        });

        if(user_exist.length===0){
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            })
        }

        const correctPassword = await bcrypt.compare(password,user_exist[0].userPassword);

        if(correctPassword){
            return res.status(201).json({
                success:true,
                message:"User Login Successfully",
                userDetails:{
                    id:user_exist[0]._id,
                    name:user_exist[0].userName,
                    email:user_exist[0].userEmail
                }
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Wrong Password",
            });   
        }

    } catch (error) {
        console.log('Error in the userLogin');
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in backend (userLogin)"
        })
    }
}

module.exports = {
    userRegister,
    userLogin
}