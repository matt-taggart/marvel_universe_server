const Router = require('koa-router');
const { fetch, validateResponse } = require('./../services/utils');

const router = new Router();

router
  .get('/stories', async ctx => {
    const response = await fetch('/stories');

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/characters', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/characters`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/comics', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/comics`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/creators', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/creators`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/events', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/events`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/series', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/series`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

