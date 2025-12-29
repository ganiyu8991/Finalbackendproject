
import jwt from "jsonwebtoken"

export async function generateToken (userId){
    try {
        if(!userId) console.error("No ID provided")
            const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    return token;
    } catch (error) {
        if(error instanceof Error){
            console.error(error.message)
        }
    }
    

}