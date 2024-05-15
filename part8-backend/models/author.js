import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  born: Number,
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

export default mongoose.model("Author", schema);
