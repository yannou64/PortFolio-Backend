import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export default async function connectionBDD(){
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("Connection mongoDB successful !")
    } catch (e){
        console.log("Connection mongoDB failed : ", e.message)
    }
}