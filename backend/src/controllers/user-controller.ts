import User from "../models/User.js";
import {Request,Response,NextFunction }from "express";
import {hash,compare} from "bcrypt"
import { ChatCompletionResponseMessageRoleEnum } from "openai";
export const getAllUsers=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const users =await User.find()
        return res.status(200).json({message :"user are fetched", users:users})
    }catch(error){
        console.log(error)
        return (res.status(500).json({message:"ERROR",error:error}))
    }

}

export  const userSignUp = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {name,email,password}=req.body;
        //verify if the email exist already
        const existing_user=await User.findOne({email})
        console.log(existing_user)
        
        if (existing_user){
            return res.status(401).json({message:"Email already registred"})
        }
        const  hashedPassword=await hash(password,10)
        const user = new User({name,email,password:hashedPassword})
        await user.save()
        return res.status(201).json({message:"OK USer ADDED ",id: user._id.toString()})
    }catch(error){
        return res.status(500).json({mesage:"ERROR",cause:error.message})
    }
}

export  const userLogin = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"User is not registred"})
        }
        // compare the password with actual string , we don't unhash then compare the strings
        const isPasswordCorrect =await compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(303).send({message:"Wrong Password"})
        }
        return res.status(200).json({message:"Succesfull Login", id: user._id.toString()})
     
    }catch(error){
        return res.status(500).json({mesage:"ERROR",cause:error.message})
    }
}