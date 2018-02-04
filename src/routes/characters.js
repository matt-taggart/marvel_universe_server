const Router = require('koa-router');
const {
  fetch,
  validateResponse,
  parseResponse,
} = require('./../services/utils');

const router = new Router();

router
  .get('/characters', async ctx => {
    const response = await fetch('/characters', ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/characters/:id', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/characters/:id/comics', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}/comics`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/characters/:id/events', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}/events`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/characters/:id/series', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}/series`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  })
  .get('/characters/:id/stories', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}/stories`, ctx.query);

    validateResponse(response, ctx);

    parseResponse(response, ctx);
  });

module.exports = router;

