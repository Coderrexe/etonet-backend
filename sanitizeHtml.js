const { marked } = require("marked");
// Sanitize markdown HTML code to eliminate malicious JavaScript code.
const createDomPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const mongoose = require("mongoose");
const { Article } = require("./models/articleModel");

// Allows dompurifier to create  and purify HTML using the JSDOM window object.
const dompurify = createDomPurifier(new JSDOM().window);

Article.findById("635473fa8bea319ed3e041a1").then((article) => {
  const sanitizedHtml = dompurify.sanitize(marked(article.markdown));
  article.sanitizedHtml = sanitizedHtml;
});
