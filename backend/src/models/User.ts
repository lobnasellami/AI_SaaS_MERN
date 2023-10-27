import mongoose from "mongoose";
import { randomUUID } from "crypto";
const schema=mongoose.Schema;
const chatSchema = new schema ({
    id :{
        type:String,
        default :randomUUID(), 
    },
    role:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
})
const userSchema= new schema({
    name :{
        type : String,
        required :true
    },
    email:{
        type : String,
        required : true,
        unique :true
    },
     password:{
        type : String,
        required : true
    } ,
    chats:[chatSchema]

});

export default mongoose.model("User",userSchema)
