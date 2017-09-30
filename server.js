require('dotenv').load();

const Koa = require('koa');
const Router = require('koa-router');
const Boom = require('boom');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = new Koa();
const router = new Router();
const pool = new Pool();
const { PORT = 3000 } = process.env;

router
  .get('/keepAlive', async ctx => {
    ctx.response.status = 200;
  });

router
  .post('/users', async ctx => {
    const { username, password } = ctx.request.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rowCount, rows: [row] } = await pool.query({
      text: 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      values: [username, hashedPassword],
    });

    if (!rowCount) {
      ctx.status = 400;
      ctx.body = Boom.badRequest('Unable to add user');
      return;
    }

    ctx.body = { 
      id: row.id,
      username: row.username,
    };
  });

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT);
