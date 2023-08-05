// app.js

const express = require("express");
const ejs = require("ejs");
const gtts = require("gtts");
const { fileURLToPath } = require("url");
const { join } = require("path");
const { SummarizerManager } = require("node-summarizer");
// Load wink-nlp package.
const winkNLP = require("wink-nlp");
// Load english language model — light version.
const model = require("wink-eng-lite-web-model");
// Instantiate winkNLP.
const nlp = winkNLP(model);
// Obtain "its" helper to extract item properties.
const its = nlp.its;
// Obtain "as" reducer helper to reduce a collection.
const as = nlp.as;

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", join(__dirname, "views", "pages")); // Set the views directory

app.use(express.static(join(__dirname, "public")));

// Middleware to set the active route for navigation
app.use((req, res, next) => {
  res.locals.activeRoute = req.url;
  next();
});

app.post("/text-to-speech", (req, res) => {
  const text = req.body.text;
  const language = req.body.language || "en";
  const speed = req.body.speed || "normal";

  // Generate the speech audio using GTTS
  const speech = new gtts(text, language, speed);

  // Set the appropriate headers
  res.setHeader("Content-Type", "audio/mpeg");

  // Stream the speech audio to the response
  speech.stream().pipe(res);
});

// Route to handle form submission and display summary
app.post("/text-summarizer", async (req, res) => {
  const textToSummarize = req.body.textToSummarize; // Assuming your form field name is "textToSummarize"
  const numberOfSentences = parseInt(req.body.numberOfSentences);

  // Initialize SummarizerManager
  const summarizer = new SummarizerManager(textToSummarize, numberOfSentences);

  try {
    // Get summary using TextRank method
    const rankSummaryObject = await summarizer.getSummaryByRank();
    const rankSummary = rankSummaryObject.summary;

    // Calculate the reduction percentage and remaining percentage based on the chosen summary method
    const rankReductionObj = await summarizer.getRankReduction();

    const rankReductionPercentage = rankReductionObj.reduction;

    // Calculate remaining percentage (100% - reduction percentage)
    const rankRemainingPercentage = (
      100 - parseFloat(rankReductionPercentage)
    ).toFixed(2);

    // Calculate the word and character count
    const charCount = textToSummarize.length;
    const wordCount = textToSummarize
      .split(/\s+/)
      .filter((word) => word !== "").length;

    res.render("text-summarizer", {
      textToSummarize,
      numberOfSentences,
      charCount,
      wordCount,
      rankSummary,
      rankRemainingPercentage,
    });
  } catch (error) {
    res.render("text-summarizer", {
      error: "An error occurred during summarization.",
    });
  }
});

function performWordFrequencyAnalysis(text) {
  const doc = nlp.readDoc(text);
  const typeFreq = doc.tokens().out(its.type, as.freqTable);
  const wordFreq = doc.tokens().out(its.value, as.freqTable);
  return { typeFreq, wordFreq };
}

function convertSentimentToText(sentimentScore) {
  if (sentimentScore > 0.7) {
    return "Very Positive 😄";
  } else if (sentimentScore > 0.3) {
    return "Positive 🙂";
  } else if (sentimentScore > -0.3) {
    return "Neutral 😐";
  } else if (sentimentScore > -0.7) {
    return "Negative 😞";
  } else {
    return "Very Negative 😢";
  }
}

function performSentimentAnalysis(text) {
  const doc = nlp.readDoc(text);
  const sentimentScore = doc.out(its.sentiment);
  const sentimentText = convertSentimentToText(sentimentScore);
  return sentimentText;
}

function performPosAnalysis(text) {
  const doc = nlp.readDoc(text);
  const tokens = doc.tokens();

  const posCounts = {};

  tokens.each((token) => {
    const posTag = token.out(its.pos);
    const word = token.out(its.value);

    if (posTag) {
      if (!posCounts[posTag]) {
        posCounts[posTag] = {
          count: 1,
          words: [word],
        };
      } else {
        posCounts[posTag].count++;
        posCounts[posTag].words.push(word);
      }
    }
  });

  return posCounts;
}

function performNamedEntityRecognition(text) {
  const doc = nlp.readDoc(text);
  // Get entity details and counts
  const entities = doc.entities().out(its.detail);

  // Count entities by type
  const entityCounts = {};
  entities.forEach((entity) => {
    const type = entity.type;
    if (!entityCounts[type]) {
      entityCounts[type] = 1;
    } else {
      entityCounts[type]++;
    }
  });

  console.log({ entities, entityCounts });

  return { entities, entityCounts };
}

app.post("/analyze", (req, res) => {
  const textInput = req.body.textInput;
  const selectedFeature = req.body.feature;

  // Calculate the word and character count
  const charCount = textInput.length;
  const wordCount = textInput.split(/\s+/).filter((word) => word !== "").length;

  let analysisResults = {};

  if (selectedFeature === "wordFrequency") {
    analysisResults.wordFrequencyAnalysisResults =
      performWordFrequencyAnalysis(textInput);
  } else if (selectedFeature === "sentimentAnalysis") {
    analysisResults.sentimentAnalysisResults =
      performSentimentAnalysis(textInput);
  } else if (selectedFeature === "posAnalysis") {
    analysisResults.posAnalysisResult = performPosAnalysis(textInput);
  } else if (selectedFeature === "ner") {
    analysisResults.nerResults = performNamedEntityRecognition(textInput);
  }

  res.render("text-analyzer", {
    textInput,
    charCount,
    wordCount,
    ...analysisResults,
  });
});

// *** GET Routes - display pages ***

app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/text-to-speech", async (req, res) => {
  res.render("text-to-speech");
});

app.get("/text-to-text", async (req, res) => {
  res.render("text-to-text");
});

app.get("/text-summarizer", (req, res) => {
  res.render("text-summarizer");
});

app.get("/text-analyzer", (req, res) => {
  res.render("text-analyzer");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
