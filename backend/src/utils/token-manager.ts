import jwt  from "jsonwebtoken"
import {Request ,Response,NextFunction} from "express"
import { COOKIE_NAME } from "./contants.js"
export const createToken=(id :string, email:string,expiresIn:string)=>{
    const payload= {id ,email}
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn ,
    })
    return token 
}

export const verifyToken =async (req :Request,res:Response,next:NextFunction)=>{
const token=req.signedCookies[`${COOKIE_NAME}`]
console.log(token)
if (!token || token.trim()===""){
   return res.status(401).json("Token Not Received ")
}
return new Promise<void>((resolve,reject)=>{
    //verify the token 
        return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
            if (err){
                reject(err.message);
                return res.status(401).json({message:"Token Expired"})
            }else{
                resolve();
                // this midleware can set some local variables from the response and then we can use them for the next middleware   
                res.locals.jwtData =success
                return next()
                
            }
            
        })
    })
}