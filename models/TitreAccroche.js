import mongoose from "mongoose";

const TitreAccrocheSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    nameAndSurname: {
      type: String,
    },
    accroche: {
      type: String,
    },
  },
  { timestamps: true }
);

const TitreAccroche = mongoose.model("TitreAccroche", TitreAccrocheSchema);

export default TitreAccroche;
