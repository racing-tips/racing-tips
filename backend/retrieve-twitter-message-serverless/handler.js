const needle = require("needle");
const token = process.env.TWITTER_API_BEARER_TOKEN;
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

module.exports.bot = async (event, context) => {
  try {
    const response = await getTweets();
    console.log(response);
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
}

async function getTweets() {
  const params = {
    "query": "from:R4RacingTips",
    "tweet.fields": "author_id,created_at,text,id",
  };

  const res = await needle("get", endpointUrl, params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}
