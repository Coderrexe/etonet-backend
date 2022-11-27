// Convert markdown into HTML.
const { marked } = require("marked");
// Sanitize markdown HTML code to eliminate malicious JavaScript code.
const createDomPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const { Article } = require("../models/articleModel");

marked.setOptions({
  breaks: true,
});

// Retrieve all articles.
async function getArticles(req, res) {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// Retrieve only 1 article with requested ID.
async function getArticle(req, res) {
  const article = await Article.findById(req.params.articleId);
  if (!article) {
    return res.status(404).json({ error: "No such article" });
  }
  res.status(200).json(article);
}

// Create a new article.
async function createArticle(req, res) {
  if (req.body.password == "password") {
    const article = new Article({
      title: req.body.title,
      markdown: req.body.markdown,
      author: req.body.author,
      datePublished: req.body.datePublished,
      category: req.body.category,
      thumbnailUrl: req.body.thumbnailUrl,
      readTime: req.body.readTime,
    });

    try {
      article.save();
      res.status(200).json("Success!");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(403).json("Permission not allowed");
  }
}

// Edit an article (admin only).
async function editArticle(req, res) {
  if (req.body.password == "password") {
    let article = await Article.findById(req.params.articleId);
    if (!article) {
      return res.status(404).json({ error: "No such article" });
    }

    if (!req.body.shouldHtml) {
      // Allows dompurifier to create  and purify HTML using the JSDOM window object.
      const dompurify = createDomPurifier(new JSDOM().window);
      const sanitizedHtml = dompurify.sanitize(marked(req.body.markdown));

      await Article.updateOne(
        { _id: req.params.articleId },
        {
          $set: {
            title: req.body.title,
            markdown: req.body.markdown,
            author: req.body.author,
            datePublished: req.body.datePublished,
            category: req.body.category,
            thumbnailUrl: req.body.thumbnailUrl,
            readTime: req.body.readTime,
            sanitizedHtml: sanitizedHtml,
          },
        },
        { multi: true }
      );
    } else if (req.body.shouldHtml == "no") {
      await Article.updateOne(
        { _id: req.params.articleId },
        {
          $set: {
            title: req.body.title,
            markdown: req.body.markdown,
            author: req.body.author,
            datePublished: req.body.datePublished,
            category: req.body.category,
            thumbnailUrl: req.body.thumbnailUrl,
            readTime: req.body.readTime,
            sanitizedHtml: req.body.manualHtml,
          },
        },
        { multi: true }
      );
    }

    res.status(200).json(article);
  } else {
    res.status(403).json("Permission not allowed");
  }
}

module.exports = {
  createArticle,
  editArticle,
  getArticle,
  getArticles,
};
