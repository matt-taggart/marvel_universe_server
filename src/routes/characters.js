const Router = require('koa-router');
const { fetch } = require('./../services/utils');

const router = new Router();

router
  .get('/characters', async ctx => {
    const response = await fetch('/characters');

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id/comics', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}/comics`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id/events', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}/events`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id/series', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}/series`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id/stories', async ctx => {
    const response = await fetch(`/characters/${ctx.params.id}/stories`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

