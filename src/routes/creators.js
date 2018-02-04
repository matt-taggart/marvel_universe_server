const Router = require('koa-router');
const {
  fetch,
  validateResponse,
  parseResponse,
} = require('./../services/utils');

const router = new Router();

router
  .get('/creators', async ctx => {
    const response = await fetch('/creators', ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/creators/:id', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}`, ctx.query);

    validateResponse(response, ctx);

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/comics', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}/comics`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/creators/:id/events', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}/events`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/creators/:id/series', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}/series`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/creators/:id/stories', async ctx => {
    const response = await fetch(`/creators/${ctx.params.id}/stories`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  });

module.exports = router;

