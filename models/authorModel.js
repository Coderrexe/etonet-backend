const mongoose = require("mongoose");
const { articleSchema } = require("./articleModel");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    enum: ["B", "C", "D", "E", "F"],
    required: true,
  },
  articles: [
    {
      type: articleSchema,
      required: true,
    },
  ],
});

const Author = mongoose.model("_", authorSchema);

module.exports = {
  Author,
  authorSchema,
};
