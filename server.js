require('dotenv').load();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const bcrypt = require('bcrypt');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const db = require('./db');
const errorHandler = require('./services/errorHandler');
const { createParams } = require('./services/utils');

const app = new Koa();
const router = new Router();

const { PORT = 3000 } = process.env;

router
  .get('/keepAlive', async ctx => {
    ctx.response.status = 200;
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

router
  .post('/login', async ctx => {
    const { username, password } = ctx.request.body;

    const { rowCount, rows: [user] } = await db.query({
      text: 'SELECT * FROM users WHERE username = ($1)',
      values: [username],
    });

    if (!rowCount) {
      ctx.throw(400, 'Invalid username');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      ctx.throw(401, 'Invalid password');
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

    const { rowCount, rows: [user] } = await db.query({
      text: 'SELECT id, username FROM users WHERE id = ($1)',
      values: [id],
    });

    if (!rowCount) {
      ctx.throw(400, 'User does not exist');
    }

    ctx.body = {
      id: user.id,
      password: user.username,
    };
  });

router
  .post('/users', async ctx => {
    const { username, password } = ctx.request.body;

    const { rows: [result] } = await db.query({
      text: 'SELECT COUNT(username) FROM users WHERE username = ($1)',
      values: [username],
    });

    if (+result.count) {
      ctx.throw(400, 'Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { rowCount, rows: [user] } = await db.query({
      text: 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      values: [username, hashedPassword],
    });

    if (!rowCount) {
      ctx.throw(400, 'Unable to add user');
    }

    ctx.body = {
      id: user.id,
      username: user.username,
    };
  });

router
  .get('/characters', async ctx => {
    const params = createParams();

    const response = await axios.get('http://gateway.marvel.com/v1/public/characters', { params });

    if (response.status !== 200) {
      ctx.throw(503, 'Server is unavailable at this time. Please try again.');
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${ctx.params.id}`, { params });

    if (response.status !== 200) {
      ctx.throw(503, 'Server is unavailable at this time. Please try again.');
    }

    ctx.body = { data: response.data.data.results };
  });

app
  .use(errorHandler())
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT);
