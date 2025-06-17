import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export default async function connectionBDD(){
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("Connection successful !")
    } catch (e){
        console.log("Connection database failed : ", e.message)
    }
}