import mongoose from "mongoose";

const ProjetSchema = new mongoose.Schema({
  titre_projet: {
    type: String,
    required: true,
    trim: true,
  },
  image_projet: {
    type: String,
  },
  alt_img_projet: {
    type: String,
    required: true,
    trim: true,
  },
  description_projet: {
    type: String,
    required: true,
    trim: true,
  },
  is_favoris_projet: {
    type: Boolean,
    default: false
  },
  technos_projet: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Techno",
    },
  ],
},{timestamps: true});

const Projet = mongoose.model("Projet", ProjetSchema);

export default Projet;
