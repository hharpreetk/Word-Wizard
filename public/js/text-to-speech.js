// public/js/text-to-speech.js

import { handleSpeechRequest } from "./modules/formHandler.js";
import { updateCounts } from "./modules/countUpdater.js";
import { toggleNav, resetNavOnResize } from "./modules/navMenuHandler.js";

const form = document.getElementById("textToSpeechForm");
const speechAudio = document.getElementById("speechAudio");

const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");

textInput.addEventListener("input", () => {
  updateCounts(textInput, charCount, wordCount);
});

// Attach form submit event listener
form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSpeechRequest(form, speechAudio);
});
