// public/js/text-summarizer.js

import { toggleNav, resetNavOnResize } from "./modules/navMenuHandler.js";
import { updateCounts } from "./modules/countUpdater.js";

const textInput = document.getElementById("textToSummarize");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");

textInput.addEventListener("input", () => {
  updateCounts(textInput, charCount, wordCount);
});
