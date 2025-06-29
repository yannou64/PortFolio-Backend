import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema(
  {
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
    category: {
      type: String,
      default: "Certification",
      enum: ["Certification", "Diplôme"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    lieu: {
      type: String,
      default: "",
      trim: true,
    },
    organisme: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const Certification = mongoose.model("Certification", CertificationSchema);

export default Certification