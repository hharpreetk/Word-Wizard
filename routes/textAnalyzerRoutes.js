// routes/textAnalyzerRoutes.js

const express = require("express");
const router = express.Router();
const textAnalyzerController = require("../controllers/textAnalyzerController");

// Define the route using the controller function
router.post("/", textAnalyzerController.analyzeText);

module.exports = router;
