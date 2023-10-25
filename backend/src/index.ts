// // GET : we want to get data from backend 
// // PUT : make some modifiacation
// // POST: add item 
// // DELETE : delete something 
// // express.json() : middleware that is used to parse incoming JSON data from requests. 
// app.use(express.json())
// app.get("/hello",(req,res,next)=>{
// // req , is the request object 
// // res is the response 
// //  The next() function is a function in the Express router that, when invoked, executes the next middleware in the middleware stack 
// return res.send("hello")
// });
// app.listen(5000,()=> console.log("waw")) 
import express from "express"
import {config}from "dotenv"
config()
const app = express();
app.use(express.json())
app.listen(5000,()=> console.log("waw")) 
