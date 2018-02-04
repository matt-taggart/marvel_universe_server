const Router = require('koa-router');
const {
  fetch,
  validateResponse,
  parseResponse,
} = require('./../services/utils');

const router = new Router();

router
  .get('/comics', async ctx => {
    const response = await fetch('/comics', ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/comics/:id', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/comics/:id/characters', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}/characters`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/comics/:id/creators', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}/creators`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/comics/:id/events', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}/events`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/comics/:id/stories', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}/stories`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  });

module.exports = router;

