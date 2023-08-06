// routes/textToSpeechRoutes.js

const express = require("express");
const router = express.Router();
const textToSpeechController = require("../controllers/textToSpeechController");

// Define the route using the controller function
router.post("/", textToSpeechController.textToSpeech);

module.exports = router;
