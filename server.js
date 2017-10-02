require('dotenv').load();

const Koa = require('koa');
const Router = require('koa-router');
const Boom = require('boom');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const bcrypt = require('bcrypt');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
const { Pool } = require('pg');

const app = new Koa();
const router = new Router();
const pool = new Pool();

const {
  PORT = 3000,
  PUBLIC_KEY,
  PRIVATE_KEY,
} = process.env;

router
  .get('/keepAlive', async ctx => {
    ctx.response.status = 200;
  });

const auth = async (ctx, next) => {
  const cookie = ctx.cookies.get('marvel-universe');

  if (!cookie) {
    ctx.status = 401;
    ctx.body = Boom.unauthorized('Cookie not found');
    return;
  }

  try {
    jwt.verify(cookie, 'secretsauce');
  } catch (e) {
    ctx.status = 401;
    ctx.body = Boom.unauthorized(e.message);
    return;
  }

  await next();
};

router
  .post('/login', async ctx => {
    const { username, password } = ctx.request.body;

    const { rowCount, rows: [user] } = await pool.query({
      text: 'SELECT * FROM users WHERE username = ($1)',
      values: [username],
    });

    if (!rowCount) {
      ctx.status = 400;
      ctx.body = Boom.badRequest('Invalid username');
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      ctx.status = 401;
      ctx.body = Boom.unauthorized('Invalid password');
      return;
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'secretsauce');

    ctx.cookies.set('marvel-universe', token);

    ctx.body = {
      id: user.id,
      username: user.username,
    };
  });

router
  .get('/users/:id', auth, async ctx => {
    const { id } = ctx.params;

    const { rowCount, rows: [user] } = await pool.query({
      text: 'SELECT id, username FROM users WHERE id = ($1)',
      values: [id],
    });

    if (!rowCount) {
      ctx.status = 400;
      ctx.body = Boom.badRequest('User does not exist');
      return;
    }

    ctx.body = {
      id: user.id,
      password: user.username,
    };
  });

router
  .post('/users', async ctx => {
    const { username, password } = ctx.request.body;

    const { rows: [result] } = await pool.query({
      text: 'SELECT COUNT(username) FROM users WHERE username = ($1)',
      values: [username],
    });

    if (+result.count) {
      ctx.status = 400;
      ctx.body = Boom.badRequest('Username already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { rowCount, rows: [user] } = await pool.query({
      text: 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      values: [username, hashedPassword],
    });

    if (!rowCount) {
      ctx.status = 400;
      ctx.body = Boom.badRequest('Unable to add user');
      return;
    }

    ctx.body = {
      id: user.id,
      username: user.username,
    };
  });

router
  .get('/characters', async ctx => {
    const str = Date.now() + PRIVATE_KEY + PUBLIC_KEY;
    const md5 = createHash('md5');
    const hash = md5.update(str).digest('hex');

    const params = {
      ts: Date.now(),
      apikey: PUBLIC_KEY,
      hash,
    };

    const response = await axios.get('http://gateway.marvel.com/v1/public/characters', { params });

    if (response.status !== 200) {
      ctx.status = 503;
      ctx.body = Boom.serverUnavailable('Server is unvailable at this time.  Please try again.');
      return;
    }

    ctx.body = { data: response.data.data.results };
  });

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT);
