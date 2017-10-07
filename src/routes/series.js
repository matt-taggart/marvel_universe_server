const Router = require('koa-router');
const { fetch, validateResponse } = require('./../services/utils');

const router = new Router();

router
  .get('/series', async ctx => {
    const response = await fetch('/series');

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/characters', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/characters`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/comics', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/comics`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/creators', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/creators`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/events', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/events`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/stories', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/stories`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

