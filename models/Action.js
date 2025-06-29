import mongoose from "mongoose";

const ActionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    default: "",
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  competences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competence",
    },
  ],
  technos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Techno",
    },
  ],
  certifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certification",
    },
  ],
  experience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experience",
  },
});

const Action = mongoose.model("Action", ActionSchema);
export default Action