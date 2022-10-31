const mongoose = require("mongoose");
const { articleSchema } = require("./articleModel");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: articleSchema,
      required: true,
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = {
  Category,
  categorySchema,
};
