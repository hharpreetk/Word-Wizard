// public/scripts/text-analyzer.js

import { toggleNav, resetNavOnResize } from "./modules/navMenuHandler.js";
import { updateCounts } from "./modules/countUpdater.js";

const textInput = document.getElementById("textAnalyzerTextInput");
const charCount = document.getElementById("textAnalyzerCharCount");
const wordCount = document.getElementById("textAnalyzerWordCount");

textInput.addEventListener("input", () => {
  updateCounts(textInput, charCount, wordCount);
});
