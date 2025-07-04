import mongoose from "mongoose";

const TechnoSchema = new mongoose.Schema(
  {
    techno: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
      default: "",
    },
    categorie: {
      type: String,
      default: "Langage / Framework",
      enum: ["Langage / Framework", "Outil de développement", "Design / Organisation"],
      trim: true,
    },
    level: {
      type: String,
      default: "Débutant",
      enum: ["Debutant", "Maitrise", "Expertise"],
      trim: true,
    },
  },
  { timestamps: true }
);
const Techno = mongoose.model("Techno", TechnoSchema);


export default Techno