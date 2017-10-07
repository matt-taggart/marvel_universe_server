const Router = require('koa-router');
const { fetch, validateResponse } = require('./../services/utils');

const router = new Router();

router
  .get('/characters', async ctx => {
    const response = await fetch('/characters');

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id/comics', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}/comics`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id/events', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}/events`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id/series', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}/series`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id/stories', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}/stories`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

