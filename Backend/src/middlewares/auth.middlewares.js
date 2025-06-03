import { findUserById } from "../dao/user.dao.js"
import {verifyToken} from "../utils/helper.js"
 
export const authMiddleware = async (req , res , next) =>
{
    const token = req.cookies.accessToken
    console.log("token: ",token)
    if(!token) return res.status(401).json({message:"Unauthorized"})

    try {
        const decode = verifyToken(token)
        const user = await findUserById(decode.id)
        if(!user)return res.status(401).json({message: "Unauthorized"})
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
}