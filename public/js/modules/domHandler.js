// public/js/modules/domHandler.js

import { convertText } from "./textConverter.js";

function setupConversionButtons() {
  const conversionButtons = document.querySelectorAll(".conversion-button");

  conversionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      const textInput = document.getElementById("textToTextTextInput").value;

      if (validateTextInput(textInput)) {
        const resultText = convertText(action, textInput);
        displayResult(resultText);
        clearError();
      } else {
        displayError("Please enter some text.");
      }
    });
  });
}

function validateTextInput(textInput) {
  // You can implement any specific validation logic here
  return textInput.trim() !== "";
}

function displayError(errorMessage) {
  const errorTextContainer = document.getElementById("errorText");
  errorTextContainer.textContent = errorMessage;
  errorTextContainer.style.display = "block";
}

function clearError() {
  const errorTextContainer = document.getElementById("errorText");
  errorTextContainer.textContent = "";
  errorTextContainer.style.display = "none";
}

function displayResult(resultText) {
  const resultContainer = document.getElementById(
    "textConversionResultContainer"
  );
  resultContainer.innerHTML = `<textarea rows="10" cols="50">${resultText}</textarea>`;
  resultContainer.style.display = "block";
}

export { setupConversionButtons };
