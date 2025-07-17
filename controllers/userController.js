const JWT=require('jsonwebtoken')
const { hashPassword, comparePassword } = require("../helpers/authHelpers");
const userModel = require("../models/userModel");
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "password is required and 6 character long",
      });
    }

    //existing user

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "user already register with this email",
      });
    }
    //hash password
    const hashedPassword = await hashPassword(password);
    //save user

    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "registration successfull please login",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "error in register api",
      error,
    });
  }
};


//login controller

const loginController = async (req, res) => {

    try
    {
        const {email,password}=req.body;

        if(!email||!password)
        {
            return res.status(500).send({
                success:false,
                message:'Please provide email or password'
            })
        }

        const user=await userModel.findOne({email})
        if(!user)
        {
            return res.status(500).send({
                success:false,
                message:"User not found"
            })
        }

        const match=await comparePassword(password,user.password)
        if(!match){
            return res.status(500).send({
                success:false,
                message:'Invalid username or password'
            })
        }


        const token= JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        user.password=undefined

        return res.status(200).send({
            success:true,
            message:'login successfully',
            token,
            user
            
        })

    }
    catch(error)
    {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in login api",
            error
        })
    }
};

module.exports = { registerController, loginController };


