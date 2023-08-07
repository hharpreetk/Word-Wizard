// public/scripts/modules/formHandler.js

function validateForm(textInput) {
  const errorText = document.getElementById("errorText");
  // Check if the text input is empty
  if (textInput.value.trim() === "") {
    errorText.textContent = "Please enter some text.";
    errorText.style.display = "block";
    return false;
  }

  // Additional validation checks can be added here if needed

  // If all checks pass, clear any previous error message and allow form submission
  errorText.textContent = "";
  errorText.style.display = "none";
  return true;
}

async function handleSpeechRequest(form, speechAudio) {
  if (validateForm(form.text)) {
    try {
      const formData = new FormData(form);
      const response = await fetch("/text-to-speech", {
        method: "POST",
        body: new URLSearchParams(formData),
      });

      if (!response.ok) {
        throw new Error("Error generating speech");
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      speechAudio.src = blobUrl;
      speechAudio.style.display = "inline-block";
    } catch (error) {
      console.error("Error generating speech:", error);
    }
  }
}

export { validateForm, handleSpeechRequest };
