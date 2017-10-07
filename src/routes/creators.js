const Router = require('koa-router');
const { fetch } = require('./../services/utils');

const router = new Router();

router
  .get('/creators', async ctx => {
    const response = await fetch('/creators');

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/comics', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}/comics`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/events', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}/events`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/series', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}/series`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/stories', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}/stories`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

