import mongoose from "mongoose";

const InteretSchema = new mongoose.Schema({
    interet: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Interet = mongoose.model("Interet", InteretSchema)

export default Interet