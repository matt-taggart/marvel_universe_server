const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./../db');

const router = new Router();

router
  .post('/login', async ctx => {
    const { email, password } = ctx.request.body;

    const { rowCount, rows: [user] } = await db.query({
      text: 'SELECT * FROM users WHERE email = ($1)',
      values: [email],
    });

    if (!rowCount) {
      ctx.throw(401, 'Invalid email or password provided');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      ctx.throw(401, 'Invalid email or password provided');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'secretsauce');

    ctx.cookies.set('marvel-universe', token);

    ctx.body = {
      id: user.id,
      email: user.email,
    };
  })
  .delete('/logout', async ctx => {
    if (!ctx.cookies.get('marvel-universe')) {
      ctx.throw(400, 'User is already logged out');
    }

    ctx.cookies.set('marvel-universe', null);
    ctx.body = { message: 'Logout successful' };
  });

module.exports = router;
