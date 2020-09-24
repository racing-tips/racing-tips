const needle = require("needle");
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const token = process.env.TWITTER_API_BEARER_TOKEN;
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

module.exports.bot = async () => {
  let response;
  try {
    response = await getTweets();
    // TODO Logging Lib
    console.log(response);
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }

  try {
    await writeToDB(response.data);
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
    // TODO standard error handling
    throw new Error("Unsuccessful request");
  }
}

async function writeToDB(tweets) {
  // TODO iterate
  const tweet = tweets[0];
  // TODO parameterize this
  const tableName = "racing-tips";
      try {
        await dynamodb.putItem({
            "TableName": tableName,
            "Item" : {
                "id": { N: tweet.id }, // TODO don't use twitter ID as internal id
                "created_at": {S: tweet.created_at},
                "text": {S: tweet.text}
            }
        }).promise();
      } catch (error) {
        throw new Error(`Error in dynamoDB: ${JSON.stringify(error)}`);
      }
}