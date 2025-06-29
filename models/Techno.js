import mongoose from "mongoose";

const TechnoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      default: "Langage / Framework",
      enum: ["Langage / Framework", "Outil de développement", "Design / Organisation"],
      trim: true,
    },
    level: {
      type: String,
      default: "Débutant",
      enum: ["Débutant", "Maitrise", "Expertise"],
      trim: true,
    },
  },
  { timestamps: true }
);
const Techno = mongoose.model("Techno", TechnoSchema);


export default Techno