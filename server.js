require('dotenv').load();

const Koa = require('koa');
const Router = require('koa-router');
const Boom = require('boom');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = new Koa();
const router = new Router();
const pool = new Pool();
const { PORT = 3000 } = process.env;

router
  .get('/keepAlive', async ctx => {
    ctx.response.status = 200;
  });

const auth = async (ctx, next) => {
  const { cookie } = ctx.headers;

  if (!cookie || cookie !== 'marvel-universe') {
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
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'secretsauce');

    ctx.cookies.set('marvel-universe', token);

    ctx.body = {
      id: user.id,
      username: user.username,
      token,
    };
  });
  
router
  .post('/users', async ctx => {
    const { username, password } = ctx.request.body;
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

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT);
