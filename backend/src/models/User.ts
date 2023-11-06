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
// the name inside model is important it should be the singuler of the collection , mongoose get User plurals it and look 
//for the collection Users and connect to it  
export default mongoose.model("User",userSchema)
