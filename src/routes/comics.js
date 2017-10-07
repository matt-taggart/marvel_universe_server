const Router = require('koa-router');
const { fetch, validateResponse } = require('./../services/utils');

const router = new Router();

router
  .get('/comics', async ctx => {
    const response = await fetch('/comics');

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/comics/:id', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/comics/:id/characters', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}/characters`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/comics/:id/creators', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}/creators`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/comics/:id/events', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}/events`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/comics/:id/stories', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}/stories`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

