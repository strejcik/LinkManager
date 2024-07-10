import mongoose from "mongoose";

const viewsSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    originalLink: {
      type: String,
      required: true
    },
    shortenedLink: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Views", viewsSchema);