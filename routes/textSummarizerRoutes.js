// routes/textSummarizerRoutes.js

const express = require("express");
const router = express.Router();
const textSummarizerController = require("../controllers/textSummarizerController");

// Define the route using the controller function
router.post("/", textSummarizerController.summarizeText);

module.exports = router;
