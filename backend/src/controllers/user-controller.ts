import User from "../models/User.js";
import {Request,Response,NextFunction }from "express";
import {hash,compare} from "bcrypt"
import {createToken} from "../utils/token-manager.js"
import { ChatCompletionResponseMessageRoleEnum } from "openai";
import { COOKIE_NAME } from "../utils/contants.js";
export const getAllUsers=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const users =await User.find()
        return res.status(200).json({message :"users are fetched", users:users})
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
        // create token and store cookie 
        res.clearCookie(COOKIE_NAME,{domain : "localhost",
        httpOnly:true,
        signed:true,
        path:"/"
         })
        const token = createToken(user._id.toString(),user.email.toString(),"7d")
        // send token to format of cookies we user the cookie-parser package it send to data from backend to frontend
        const expires =new Date();
        expires.setDate(expires.getDate()+7)
        res.cookie(COOKIE_NAME,token,{path: "/", domain : "localhost",expires:expires,httpOnly:true,signed:true})


        return res.status(201).json({message:"OK User ADDED ",id: user._id.toString()})
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
            return res.status(403).send({message:"Wrong Password"})
        }
        // delete the coookie 
        res.clearCookie(COOKIE_NAME,{domain : "localhost",
            httpOnly:true,
            signed:true,
            path:"/"
        })
        const token = createToken(user._id.toString(),user.email.toString(),"7d")
        // send token to format of cookies we user the cookie-parser package it send to data from backend to frontend
        const expires =new Date();
        expires.setDate(expires.getDate()+7)
        res.cookie(COOKIE_NAME,token,{path: "/", domain : "localhost",expires:expires,httpOnly:true,signed:true})
        return res.status(200).json({message:"Succesfull Login", id: user._id.toString()})
     
    }catch(error){
        return res.status(500).json({mesage:"ERROR",cause:error.message})
    }
}