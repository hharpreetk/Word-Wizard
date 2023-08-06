// public/js/text-to-text.js

import { toggleNav, resetNavOnResize } from "./modules/navMenuHandler.js";
import { setupConversionButtons } from "./modules/domHandler.js";
import { updateCounts } from "./modules/countUpdater.js";

const textInput = document.getElementById("textToTextTextInput");
const charCount = document.getElementById("textToTextCharCount");
const wordCount = document.getElementById("textToTextWordCount");

textInput.addEventListener("input", () => {
  updateCounts(textInput, charCount, wordCount);
});

document.addEventListener("DOMContentLoaded", () => {
  setupConversionButtons();
});
