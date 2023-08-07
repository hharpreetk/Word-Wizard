// public/js/modules/textConverter.js

function convertText(action, textInput) {
  let resultText = "";

  switch (action) {
    case "upper":
      resultText = textInput.toUpperCase();
      break;
    case "lower":
      resultText = textInput.toLowerCase();
      break;
    case "capitalize":
      resultText = textInput.replace(/(?:^|\s)\S/g, (char) =>
        char.toUpperCase()
      );
      break;
    case "trim":
      resultText = textInput.trim();
      break;
    case "clean":
      resultText = textInput.replace(/\s+/g, " ");
      break;
    case "hashtags":
      resultText = textInput
        .split(/\s+/)
        .map((word) => `#${word}`)
        .join(" ");
      break;
    case "order":
      resultText = textInput.split(/\s+/).sort().join(" ");
      break;
    case "reverse":
      resultText = textInput.split("").reverse().join("");
      break;
    case "remove-accents":
      resultText = removeAccents(textInput);
      break;
    case "remove-duplicates":
      resultText = removeDuplicateLines(textInput);
      break;
    default:
      resultText = textInput;
      break;
  }

  return resultText;
}

function removeAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function removeDuplicateLines(text) {
  const lines = text.split("\n");
  const uniqueLines = [...new Set(lines)];
  return uniqueLines.join("\n");
}

export { convertText, removeAccents, removeDuplicateLines };
