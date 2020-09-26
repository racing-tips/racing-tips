const AWS = require('aws-sdk');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

async function getTweets(token) {
  const params = {
    "query": "from:R4RacingTips",
    "tweet.fields": "author_id,created_at,text,id",
  };

  const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

  const res = await axios.get(endpointUrl, params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    if (res.body.data){
      return res.body.data;
    } else {
      throw new Error("Bad Response Format");
    }
  } else {
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
                "id": { N: uuidv4() }, // TODO don't use twitter ID as internal id
                "tweetId": { N: tweet.id },
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
