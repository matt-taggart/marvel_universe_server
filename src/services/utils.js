const { createHash } = require('crypto');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const {
  PRIVATE_KEY,
  PUBLIC_KEY,
  API_HOST,
  API_VERSION,
  API_ACCESS,
} = process.env;

exports.generateHash = () => {
  const str = Date.now() + PRIVATE_KEY + PUBLIC_KEY;
  const md5 = createHash('md5');
  const hash = md5.update(str).digest('hex');

  return hash;
};

exports.createParams = () => ({
  ts: Date.now(),
  apikey: PUBLIC_KEY,
  hash: exports.generateHash(),
});

exports.auth = async (ctx, next) => {
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

exports.fetch = (route, query = {}) => {
  const params = Object.assign({}, exports.createParams(), { limit: 50 }, query);
  const url = `${API_HOST}/${API_VERSION}/${API_ACCESS}/${route}`;

  return axios.get(url, { params });
};

exports.validateResponse = ({ status }, ctx) => {
  if (status !== 200) {
    ctx.throw(503);
  }
};

exports.parseResponse = (response, ctx) => {
  const { data: { total, count, results } } = response.data;

  ctx.body = {
    data: results,
    total,
    count,
  };
};

