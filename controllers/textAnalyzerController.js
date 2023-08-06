// controllers/textAnalyzerController.js

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

  return { entities, entityCounts };
}


// controller function for text analysis
exports.analyzeText = (req, res) => {
  const textInput = req.body.textInput;
  const selectedFeature = req.body.feature;

  // Calculate the word and character count
  const charCount = textInput.length;
  const wordCount = textInput.split(/\s+/).filter((word) => word !== "").length;

  // Perform analysis and prepare data for rendering
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
};
