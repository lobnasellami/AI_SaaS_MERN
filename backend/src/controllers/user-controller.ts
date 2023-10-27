import User from "../models/User.js";
import {Request,Response,NextFunction }from "express";
export const getAllUsers=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const users =await User.find()
        return res.status(200).json({message :"user are fetched", users:users})
    }catch(error){
        console.log(error)
        return (res.status(500).json({message:"ERROR",error:error}))
    }

}
export const userSignUp = async()=>{
    try{
        const users =await User.find()
        return res.status(200).json({message :"user are fetched", users:users})
    }catch{
        console.log(error)
        return (res.status(500).json({message:"ERROR",error:error}))
    }
}