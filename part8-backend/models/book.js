import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2 },
  published: { type: Number, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  genres: [{ type: String }],
});

export default mongoose.model("Book", schema);
