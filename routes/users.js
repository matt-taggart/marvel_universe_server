const Router = require('koa-router');
const bcrypt = require('bcrypt');
const db = require('./../db');
const { auth } = require('./../services/utils');

const router = new Router();

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
  })
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

module.exports = router;
