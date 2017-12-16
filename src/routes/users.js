const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./../db');
const { auth } = require('./../services/utils');

const router = new Router();

router
  .get('/user', auth, async ctx => {
    const token = ctx.cookies.get('marvel-universe');
    const { id } = jwt.decode(token);

    const { rowCount, rows: [user] } = await db.query({
      text: 'SELECT * FROM users WHERE id = ($1)',
      values: [id],
    });

    if (!rowCount) {
      ctx.throw(400, 'User does not exist');
    }

    ctx.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      age: user.age,
    };
  })
  .post('/user', async ctx => {
    const { name, email, password, gender, age } = ctx.request.body;

    const { rows: [result] } = await db.query({
      text: 'SELECT COUNT(*) FROM users WHERE email = ($1)',
      values: [email],
    });

    if (+result.count) {
      ctx.throw(401, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { rowCount, rows: [user] } = await db.query({
      text: 'INSERT INTO users (name, email, password, gender, age) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email',
      values: [name, email, hashedPassword, gender, age],
    });

    if (!rowCount) {
      ctx.throw(400, 'Unable to add user');
    }

    ctx.status = 201;
    ctx.body = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });

module.exports = router;
