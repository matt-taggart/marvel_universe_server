const Router = require('koa-router');

const router = new Router();

router
  .get('/keepAlive', async ctx => {
    ctx.response.status = 200;
  });

module.exports = router;
