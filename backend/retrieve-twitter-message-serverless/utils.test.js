const { getTweets, writeToDB } = require('./utils');
const axios = require('axios'); // TODO not sure I like having to import axios to mock
jest.mock('axios');

test('get tweet returns tweet successfully', async () => {
  expect.assertions(1);
  axios.get.mockResolvedValue({ body: { data: [{ id: 1}] }});
  const result = await getTweets('token');
  expect(result).toEqual([{ id: 1}]);
});

test('get tweet with no data throws error', async () => {
  axios.get.mockResolvedValue({ body: { missingDataKey: {}}});
  // See here for syntax to test async / await thrown errors https://jestjs.io/docs/en/asynchronous#resolves-rejects
  await expect(getTweets('token')).rejects.toThrow('Bad Response Format');
});

test('get tweet with no body throws error', async () => {
  axios.get.mockResolvedValue({});
  // See here for syntax to test async / await thrown errors https://jestjs.io/docs/en/asynchronous#resolves-rejects
  await expect(getTweets('token')).rejects.toThrow('Unsuccessful request');
});