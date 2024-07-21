import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    originalLink: {
      type: String,
      required: true,
    },
    shortenedLink: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    allowedips: {
      type: Array,
      required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {type: Date, default: new Date().getTime()},
  }
);

export default mongoose.model("Link", linkSchema);