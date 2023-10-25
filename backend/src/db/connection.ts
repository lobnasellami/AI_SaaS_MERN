import {connect,disconnect} from "mongoose"
export default async function connectionToDB(){
    try{
        await connect(process.env.MONGODB_URL);
    }catch(error){
        console.log(error)
        throw new Error ("Connection to mongodb FAILED")
    }
}

async function disconnectFromDB(){
    try{
        await disconnect()
    }catch(error){
        console.log(error)
        throw new Error ("Could not disconnect from mongodb")
    }
}

export {disconnectFromDB,connectionToDB}