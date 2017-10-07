const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./../db');

const router = new Router();

router
  .post('/login', async ctx => {
    const { username, password } = ctx.request.body;

    const { rowCount, rows: [user] } = await db.query({
      text: 'SELECT * FROM users WHERE username = ($1)',
      values: [username],
    });

    if (!rowCount) {
      ctx.throw(401, 'Invalid username or password provided');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      ctx.throw(401, 'Invalid username or password provided');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'secretsauce');

    ctx.cookies.set('marvel-universe', token);

    ctx.body = {
      id: user.id,
      username: user.username,
    };
  })
  .delete('/logout', async ctx => {
    if (!ctx.cookies.get('marvel-universe')) {
      ctx.throw(400, 'User is already logged out')
    }

    ctx.cookies.set('marvel-universe', null);
    ctx.body = { message: 'Logout successful' };
  });

module.exports = router;
