import mongoose from "mongoose";
import { maxLength } from "zod";

mongoose.set("sanitizeFilter", true); // nettoie les clés des filtres ($, .)
mongoose.set("strictQuery", true); // rejette les chemins inconnus dans les filtres

const TechnoSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    image: {
      type: String,
      trim: true,
      default: "",
      required: true,
    },
    alt_img: {
      type: String,
      trim: true,
      default: "",
      required: true,
      maxLength: 100
    },
    categorie: {
      type: String,
      default: "Langage / Framework",
      enum: ["Langage / Framework", "Outil de développement", "Design / Organisation"],
      trim: true,
      required: true,
      maxLength: 50,
    },
    niveau: {
      type: String,
      default: "Débutant",
      enum: ["Debutant", "Maitrise", "Expertise"],
      trim: true,
      required: true,
      maxLength: 50,
    },
  },
  { timestamps: true, strict: "throw" }
);
const Techno = mongoose.model("Techno", TechnoSchema);

export default Techno;
