import mongoose from "mongoose";

const CompetenceShema = new mongoose.Schema(
  {
    competence: {
      type: String,
      required: true,
      trim: true,
    },
    categorie: {
      type: String,
      default: "Soft Skill",
      enum: ["Soft Skill", "Hard Skill"],
    },
  },
  { timestamps: true }
);

const Competence = mongoose.model("Competence", CompetenceShema);
export default Competence 
