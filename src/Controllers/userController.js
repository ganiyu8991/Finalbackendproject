
import { userValidator } from "../Validator/userValidator.js"
import { userModel } from "../Models/userSchema.js"
import { loginValidator } from "../Validator/userValidator.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"
import { connectDB } from "../config/DB.js"

export const postUser = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const {error} = userValidator.validate({username, email, password})
        if(error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }
        await connectDB()

        const user = await userModel.create({
            username,
            email,
            password
        })
        const token = await generateToken(user._id)
        res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
        return res.status(201).json({
            message: "User successfully created",
            data: user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            reason: "Internal server error"
        });
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body 
   

        try {
             const {error} = loginValidator.validate({email, password})

     if(error) {
            return res.status(400).json({
                error: error.details[0].message
            })
            
        }
        await connectDB()

        const existingUser = await userModel.findOne({email})
        if(existingUser) {
            const comparepassword = await bcrypt.compare(password, existingUser.password)
            if(comparepassword){
                const token = await generateToken(existingUser._id)
                res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
                return res.status(200).json({
                    message: "User logged in successfully", 
                    data: existingUser
                   
                })


            }else{
              return  res.status(400).json({
                    message: "Invalid credentials, pleasde try again."
                })
            }

        }else{
          return  res.status(404).json({
                message: "User does not exist, please signup"
            })
        }
        } catch (error) {
          if(error instanceof Error){
        console.error(error.message)
         res.status(500).json({
            reason: error.message
        });
    }
       
            
        }
}

export async function logOut(req, res) {
        try{
            res.clearCookie("authToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })
            res.status(200).json({
                message: "Logged out successfully"
            })
        }catch(err) {
            if(err instanceof Error) {
                console.error(err.message)
                res.status(500).json({
                    message: "Server error",
                    errorMessage: err.message
                })
            }
        }
}
export const getUser = async (req, res) => {
    try {
        const user = req.user
        res.json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    }) 
    } catch (error) {
        console.error(error)
        res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
        
    }
} 
export const getHome = (req, res) => {
    res.send('API is running....')
    
}
