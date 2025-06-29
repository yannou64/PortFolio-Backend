import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date_debut: {
      type: Date,
      required: true,
    },
    date_fin: {
      type: Date,
      required: true,
    },
    actions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Action",
      },
    ],
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", ExperienceSchema);

export default Experience