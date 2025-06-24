import mongoose from "mongoose";

const LangueSchema = new mongoose.Schema({
  langue: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    required: true,
  },
});

const Langue = mongoose.model("Langue", LangueSchema);

export default Langue;
