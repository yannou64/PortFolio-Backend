import mongoose from "mongoose";
import { maxLength } from "zod";

mongoose.set("sanitizeFilter", true); // nettoie les clés des filtres ($, .)
mongoose.set("strictQuery", true); // rejette les chemins inconnus dans les filtres

const ProjetSchema = new mongoose.Schema(
  {
    titre_projet: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    image_projet: {
      type: String,
    },
    alt_img_projet: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    description_projet: {
      type: String,
      required: true,
      trim: true,
      maxLength: 300,
    },
    is_favoris_projet: {
      type: Boolean,
      default: false,
    },
    technos_projet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Techno",
      },
    ],
  },
  { timestamps: true, strict: "throw" }
);

const Projet = mongoose.model("Projet", ProjetSchema);

export default Projet;
