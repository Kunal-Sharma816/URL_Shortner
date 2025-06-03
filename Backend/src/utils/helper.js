import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken"
import { cookieOptions } from "../config/config.js";


export const generateNanoId=(length)=>
{
    return nanoid(length)
}

export const signToken = async (payload)=>
{
    return jsonwebtoken.sign(payload , process.env.JWT_SECRET, { expiresIn: "1d" })
}

export const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        console.log(decoded.id, "Token verified");
        return decoded;
    } catch (err) {
        console.error("Token verification failed:", err.message);
        return null;
    }
};


