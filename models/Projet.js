import mongoose from "mongoose";

const ProjetSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  technos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Techno",
    },
  ],
},{timestamps: true});

const Projet = mongoose.model("Projet", ProjetSchema);

export default Projet;
