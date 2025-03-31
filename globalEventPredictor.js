// Fetch news and return sentiment scores as "ETH:XX,BTC:XX"

// 1. Fetch latest news for Ethereum and Bitcoin
const ethNewsRequest = Functions.makeHttpRequest({
  url: "https://newsapi.org/v2/everything",
  params: {
    q: "Ethereum",
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sortBy: "popularity",
    language: "en",
    apiKey: secrets.newsApiKey,
  },
});

const btcNewsRequest = Functions.makeHttpRequest({
  url: "https://newsapi.org/v2/everything",
  params: {
    q: "Bitcoin",
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sortBy: "popularity",
    language: "en",
    apiKey: secrets.newsApiKey,
  },
});

const [ethNewsResponse, btcNewsResponse] = await Promise.all([ethNewsRequest, btcNewsRequest]);

// 2. Extract top 3 headlines for each
const getHeadlines = (response) => {
  if (response.error || !response.data?.articles) return "";
  return response.data.articles.slice(0, 3).map(a => a.title).join(". ");
};

const ethNews = getHeadlines(ethNewsResponse);
const btcNews = getHeadlines(btcNewsResponse);

// 3. Get sentiment scores from Gemini
const prompt = `
Based on these crypto news headlines, give Ethereum and Bitcoin sentiment scores (0-100).
Respond ONLY in format "ETH:XX,BTC:XX" where XX are numbers.

Ethereum News: ${ethNews || "No recent news"}
Bitcoin News: ${btcNews || "No recent news"}
`;

const geminiRequest = Functions.makeHttpRequest({
  method: "POST",
  url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
  params: { key: secrets.geminiApiKey },
  data: { contents: [{ parts: [{ text: prompt }] }] },
});

const geminiResponse = await geminiRequest;

// 4. Process response
if (geminiResponse.error) {
  console.error("Gemini error:", geminiResponse.error);
  throw Error("Sentiment analysis failed");
}

const responseText = geminiResponse.data.candidates[0].content.parts[0].text;
const cleanResponse = responseText.replace(/[^ETH:BTC0-9,]/g, "");

// Validate format
if (!/ETH:\d{1,3},BTC:\d{1,3}/.test(cleanResponse)) {
  throw Error("Invalid response format from Gemini");
}

// Extract and clamp scores (0-100)
const [, ethScore] = cleanResponse.match(/ETH:(\d+)/);
const [, btcScore] = cleanResponse.match(/BTC:(\d+)/);

const formattedResult = `ETH:${Math.min(100, Math.max(0, ethScore))},BTC:${Math.min(100, Math.max(0, btcScore))}`;

return Functions.encodeString(formattedResult);