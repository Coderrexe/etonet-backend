const mongoose = require("mongoose");
// Convert markdown into HTML.
const { marked } = require("marked");
// Sanitize markdown HTML code to eliminate malicious JavaScript code.
const createDomPurifier = require("dompurify");
const { JSDOM } = require("jsdom");

// Empty line between paragraphs.
marked.setOptions({
  breaks: true,
});

// Allows DomPurifier to create and purify HTML using the JSDOM window object.
const dompurify = createDomPurifier(new JSDOM().window);

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    markdown: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    datePublished: {
      type: Date,
      default: Date.now(),
    },
    category: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    readTime: {
      type: Number,
      required: true,
    },
    // Sanitize article's markdown HTML code to eliminate malicious JavaScript code.
    sanitizedHtml: {
      type: String,
      required: true,
    },
  },
  // Disable Mongoose case sensitivity.
  { collation: { locale: "en", strength: 2 } }
);

articleSchema.pre("validate", function (next) {
  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
  }

  next();
});

const Article = mongoose.model("Article", articleSchema);

module.exports = {
  Article,
  articleSchema,
};
