// controllers/textSummarizerController.js

const { SummarizerManager } = require("node-summarizer");

exports.summarizeText = async (req, res) => {
  const textToSummarize = req.body.text; // Assuming your form field name is "textToSummarize"
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
};
