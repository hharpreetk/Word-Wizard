// app.js

const express = require("express");
const ejs = require("ejs");
const { join } = require("path");

// Import route files
const textToSpeechRoutes = require('./routes/textToSpeechRoutes');
const textSummarizerRoutes = require('./routes/textSummarizerRoutes');
const textAnalyzerRoutes = require('./routes/textAnalyzerRoutes');

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

// Use route files
app.use('/text-to-speech', textToSpeechRoutes);
app.use('/text-summarizer', textSummarizerRoutes);
app.use('/analyze', textAnalyzerRoutes);

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
