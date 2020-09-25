const AWS = require('aws-sdk');
const needle = require("needle");

async function getTweets(token) {
  const params = {
    "query": "from:R4RacingTips",
    "tweet.fields": "author_id,created_at,text,id",
  };

  const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

  const res = await needle('get', endpointUrl, params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  console.log(res);
  if (res.body) {
    return res.body;
  } else {
    // TODO standard error handling
    throw new Error("Unsuccessful request");
  }
}

async function writeToDB(dynamodb, tweets) {
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

const isTest = process.env.JEST_WORKER_ID;
function createDBClient(){
  const config = {
    apiVersion: '2012-08-10',
    convertEmptyValues: true,
    ...(isTest && {
      endpoint: 'localhost:8000',
      sslEnabled: false,
      region: 'local-env',
    }),
  };
  return new AWS.DynamoDB(config);
}

module.exports.createDBClient = createDBClient;
module.exports.getTweets = getTweets;
module.exports.writeToDB = writeToDB;
