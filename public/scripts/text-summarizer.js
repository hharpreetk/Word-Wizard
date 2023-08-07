// public/scripts/text-summarizer.js

import { toggleNav, resetNavOnResize } from "./modules/navMenuHandler.js";
import { updateCounts } from "./modules/countUpdater.js";

const textInput = document.getElementById("textSummarizerTextInput");
const charCount = document.getElementById("textSummarizerCharCount");
const wordCount = document.getElementById("textSummarizerWordCount");

textInput.addEventListener("input", () => {
  updateCounts(textInput, charCount, wordCount);
});
