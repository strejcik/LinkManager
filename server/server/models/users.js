import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
    views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Views' }],
    createdAt: {type: Date, default: new Date().getTime()},
  },
);

export default mongoose.model("User", userSchema);