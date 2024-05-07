const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  born: Number,
  // bookCount is calculated
});

module.exports = mongoose.model("Author", schema);
