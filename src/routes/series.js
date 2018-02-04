const Router = require('koa-router');
const {
  fetch,
  validateResponse,
  parseResponse,
} = require('./../services/utils');

const router = new Router();

router
  .get('/series', async ctx => {
    const response = await fetch('/series', ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/series/:id', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/series/:id/characters', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/characters`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/series/:id/comics', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/comics`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/series/:id/creators', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/creators`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/series/:id/events', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/events`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/series/:id/stories', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/stories`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  });

module.exports = router;

