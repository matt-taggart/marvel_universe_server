const Router = require('koa-router');
const { fetch, validateResponse } = require('./../services/utils');

const router = new Router();

router
  .get('/events', async ctx => {
    const response = await fetch('/events');

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/events/:id', async ctx => {
    const response = await fetch(`/events/${ctx.params.id}`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/events/:id/characters', async ctx => {
    const response = await fetch(`/events/${ctx.params.id}/characters`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/events/:id/comics', async ctx => {
    const response = await fetch(`/events/${ctx.params.id}/comics`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/events/:id/creators', async ctx => {
    const response = await fetch(`/events/${ctx.params.id}/creators`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/events/:id/series', async ctx => {
    const response = await fetch(`/events/${ctx.params.id}/series`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/events/:id/stories', async ctx => {
    const response = await fetch(`/events/${ctx.params.id}/stories`);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

