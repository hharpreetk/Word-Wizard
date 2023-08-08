# Word Wizard Web Application

Word Wizard is a web application that offers various text processing and analysis tools. It provides features such as text summarization, text-to-speech conversion, text-to-text conversion, text analysis (including word frequency analysis, sentiment analysis, part-of-speech analysis, and named entity recognition), and more.

## Features

### Text Analyzer

The Text Analyzer allows you to perform different types of analysis on a given text. It includes the following features:

- **Word Frequency Analysis:** Analyze the frequency of words and word types in the text.
- **Sentiment Analysis:** Determine the sentiment of the text (very positive, positive, neutral, negative, very negative).
- **Part-of-Speech Analysis:** Analyze the parts of speech present in the text and their respective counts.
- **Named Entity Recognition (NER):** Identify and categorize named entities (e.g., persons, organizations, locations) in the text.

### Text Summarizer

The Text Summarizer generates a summary of a given text. You can specify the desired number of sentences in the summary. It includes:

- **Automatic Summarization:** Summarize the text using the TextRank method.

### Text to Speech

The Text to Speech feature converts text input into speech audio. You can select the language and speed of the generated speech.

### Text to Text Conversion

The Text to Text Conversion offers various transformations for the input text. These transformations include:

- **Uppercase:** Convert the text to uppercase.
- **Lowercase:** Convert the text to lowercase.
- **Capitalize:** Capitalize the first letter of each word.
- **Trim:** Remove leading and trailing whitespace.
- **Clean Spaces:** Replace multiple spaces with a single space.
- **Hashtags:** Add hashtags to each word in the text.
- **Order Text:** Alphabetically order the words in the text.
- **Text Reverser:** Reverse the order of characters in the text.
- **Remove Accents:** Remove diacritics and accents from characters.
- **Remove Duplicate Lines:** Remove duplicate lines from the text.

## Usage

1. Clone the repository and install the required dependencies:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   npm install
   ```

2. Start the application:

   ```bash
   npm start
   ```

3. Access the application in your web browser by navigating to `http://localhost:3000`.

## Technologies Used

- Node.js and Express.js for the backend server.
- EJS (Embedded JavaScript) for rendering views.
- Wink-NLP library for text analysis.
- node-summarizer library for text summarization.
- gtts library for text-to-speech conversion.

## Contributing

Contributions to the Word Wizard project are welcome! Feel free to submit pull requests for bug fixes, new features, or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.