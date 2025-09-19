import mongoose from "mongoose";

const TechnoSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      trim: true,
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
    },
    categorie: {
      type: String,
      default: "Langage / Framework",
      enum: ["Langage / Framework", "Outil de développement", "Design / Organisation"],
      trim: true,
      required: true,
    },
    niveau: {
      type: String,
      default: "Débutant",
      enum: ["Debutant", "Maitrise", "Expertise"],
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);
const Techno = mongoose.model("Techno", TechnoSchema);

export default Techno;
