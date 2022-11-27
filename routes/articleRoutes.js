const express = require("express");
const {
  getArticle,
  getArticles,
  createArticle,
  editArticle,
} = require("../controllers/articleController");

const router = express.Router();

// Get all articles.
router.get("/", getArticles);

// Get a single article.
router.get("/:articleId", getArticle);

// Post a new article (admin only).
router.post("/new", createArticle);

// Edit an article (admin only).
router.post("/:articleId/edit", editArticle);

module.exports = router;
