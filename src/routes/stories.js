const Router = require('koa-router');
const { fetch, validateResponse } = require('./../services/utils');

const router = new Router();

router
  .get('/stories', async ctx => {
    const response = await fetch('/stories', ctx.query);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}`, ctx.query);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/characters', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/characters`, ctx.query);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/comics', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/comics`, ctx.query);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/creators', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/creators`, ctx.query);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/events', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/events`, ctx.query);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/series', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/series`, ctx.query);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

