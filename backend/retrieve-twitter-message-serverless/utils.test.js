const { getTweets, writeToDB } = require('./utils');
jest.mock('needle');

test('get tweet returns tweet successfully', async () => {
  expect.assertions(1);
  const result = await getTweets('token');
  expect(result).toEqual({id: 1});
});