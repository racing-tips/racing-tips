const { getTweets, writeToDB, createDBClient } = require('./utils');
const token = process.env.TWITTER_API_BEARER_TOKEN;

module.exports.bot = async () => {
  let response;
  try {
    response = await getTweets(token);
    // TODO Logging Lib
    console.log(response);
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }

  try {
    await writeToDB(createDBClient(), response);
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
}
