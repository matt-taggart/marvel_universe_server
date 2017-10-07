const Router = require('koa-router');
const { fetch } = require('./../services/utils');

const router = new Router();

router
  .get('/stories', async ctx => {
    const response = await fetch('/stories');

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/characters', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/characters`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/comics', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/comics`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/creators', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/creators`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/events', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/events`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/series', async ctx => {
    const response = await fetch(`/stories/${ctx.params.id}/series`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

