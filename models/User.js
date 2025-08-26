import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  identifiant: {
    type: String,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin"
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
