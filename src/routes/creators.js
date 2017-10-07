const Router = require('koa-router');
const { fetch, validateResponse } = require('./../services/utils');

const router = new Router();

router
  .get('/creators', async ctx => {
    const response = await fetch('/creators');

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/comics', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}/comics`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/events', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}/events`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/series', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}/series`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/stories', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}/stories`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

