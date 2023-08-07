// public/scripts/modules/updateCount.js

// Function to update the character and word counts
function updateCounts(textInput, charCount, wordCount) {
  const text = textInput.value;

  // Character count
  charCount.textContent = text.length;

  // Word count (splitting by spaces)
  const words = text.split(/\s+/).filter((word) => word !== "");
  wordCount.textContent = words.length;
}

export { updateCounts };
