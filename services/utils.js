const { createHash } = require('crypto');

const { PRIVATE_KEY, PUBLIC_KEY } = process.env;

const generateHash = () => {
  const str = Date.now() + PRIVATE_KEY + PUBLIC_KEY;
  const md5 = createHash('md5');
  const hash = md5.update(str).digest('hex');

  return hash;
};

const createParams = () => ({
  ts: Date.now(),
  apikey: PUBLIC_KEY,
  hash: generateHash(),
});

exports.generateHash = generateHash;
exports.createParams = createParams;
