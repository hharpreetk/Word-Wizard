// app.js

const express = require("express");
const ejs = require("ejs");
const { join } = require("path");

//import controllers
const textToSpeechController = require("./controllers/textToSpeechController");
const textSummarizerController = require("./controllers/textSummarizerController");
const textAnalyzerController = require("./controllers/textAnalyzerController");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", join(__dirname, "views", "pages")); // Set the views directory

app.use(express.static(join(__dirname, "public")));

// Middleware to set the active route for navigation
app.use((req, res, next) => {
  res.locals.activeRoute = req.url;
  next();
});

// Define routes using the controller functions
app.post("/text-to-speech", textToSpeechController.textToSpeech);

app.post("/text-summarizer", textSummarizerController.summarizeText);

app.post("/analyze", textAnalyzerController.analyzeText);

// Define routes to display pages
app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/text-to-speech", async (req, res) => {
  res.render("text-to-speech");
});

app.get("/text-to-text", async (req, res) => {
  res.render("text-to-text");
});

app.get("/text-summarizer", (req, res) => {
  res.render("text-summarizer");
});

app.get("/text-analyzer", (req, res) => {
  res.render("text-analyzer");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
