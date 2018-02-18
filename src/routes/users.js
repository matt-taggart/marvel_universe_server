const Router = require('koa-router');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { reduceBy } = require('ramda');
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

    const { rows: savedDataRows } = await db.query({
      text: 'SELECT resource_type, resource_id, name FROM saved_items WHERE user_id = ($1)',
      values: [id],
    });

    const parseSavedData = reduceBy((acc, item) => acc.concat(
      { id: item.resource_id, name: item.name }), []
    )(item => item.resource_type);

    ctx.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      age: user.age,
      savedData: parseSavedData(savedDataRows),
    };
  })
  .post('/user', async ctx => {
    const { name, email, password, gender, age } = ctx.request.body;

    const { rowCount: userRowCount } = await db.query({
      text: 'SELECT COUNT(*) FROM users WHERE email = ($1)',
      values: [email],
    });

    if (userRowCount) {
      ctx.throw(401, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { rowCount, rows: [user] } = await db.query({
      text: 'INSERT INTO users (name, email, password, gender, age) VALUES ($1, $2, $3, $4, $5) RETURNING *',
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
      gender: user.gender,
      age: user.age,
    };
  })
  .post('/user/:resourceType/:id', auth, async ctx => {
    const { resourceType, id } = ctx.params;
    const { name } = ctx.request.body;
    const token = ctx.cookies.get('marvel-universe');
    const { id: userId } = jwt.decode(token);

    const { rowCount, rows: [resource] } = await db.query({
      text: 'INSERT INTO saved_items (resource_type, resource_id, user_id, name) VALUES ($1, $2, $3, $4) RETURNING resource_type, resource_id',
      values: [resourceType, id, userId, name],
    });

    if (!rowCount) {
      ctx.throw(400, 'Unable to save selected resource');
    }

    ctx.status = 201;
    ctx.body = {
      resourceType: resource.resource_type,
      resourceId: resource.resource_id,
    };
  });

module.exports = router;
