const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Allow requests to be sent from the website domain, thus disabling
// CORS No "Access-Control-Allow-Origin" header error.
app.use(
  cors({
    origin: "*",
  })
);

// Parse incoming JSON requests and put the parsed data in req.body
// For POST, PUT, PATCH. Not for GET and DELETE.
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/articles", articleRoutes);

mongoose
  .connect(
    "mongodb+srv://simbashi:5gIygM8aJvyEgNWJ@cluster0.fqcadek.mongodb.net/etonetDB"
  )
  .then(() => {
    console.log("Connected to database.");
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
