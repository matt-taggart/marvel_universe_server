const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');

const app = new Koa();
const router = new Router();

router
  .get('/keepAlive', async ctx => {
    ctx.response.status = 200;
  });

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
