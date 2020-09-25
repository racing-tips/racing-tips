function needle(url) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve({ body: { id: 1}}))
  });
}

module.exports = needle;

