// controllers/textToSpeechController.js

const gtts = require("gtts");

// Controller function for text-to-speech
exports.textToSpeech = (req, res) => {
  const text = req.body.text;
  const language = req.body.language || "en";
  const speed = req.body.speed || "normal";

  // Generate the speech audio using GTTS
  const speech = new gtts(text, language, speed);

  // Set the appropriate headers
  res.setHeader("Content-Type", "audio/mpeg");

  // Stream the speech audio to the response
  speech.stream().pipe(res);
};
