const { createHash } = require('crypto');
const jwt = require('jsonwebtoken');

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

const auth = async (ctx, next) => {
  const cookie = ctx.cookies.get('marvel-universe');

  if (!cookie) {
    ctx.throw(401, 'Cookie not found');
  }

  try {
    jwt.verify(cookie, 'secretsauce');
  } catch (e) {
    ctx.throw(401, e.message);
  }

  await next();
};

exports.generateHash = generateHash;
exports.createParams = createParams;
exports.auth = auth;
