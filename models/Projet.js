import mongoose from "mongoose";

const ProjetSchema = new mongoose.Schema({
  intitule: {
    type: String,
    required: true,
    trim: true,
  },
  synthese: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  img: {
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
