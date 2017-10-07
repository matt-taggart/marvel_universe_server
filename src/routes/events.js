const Router = require('koa-router');
const { fetch } = require('./../services/utils');

const router = new Router();

router
  .get('/events', async ctx => {
    const response = await fetch('/events');

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/events/:id', async ctx => {
    const response = await fetch(`/events/${ctx.params.id}`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/events/:id/characters', async ctx => {
    const response = await fetch(`/events/${ctx.params.id}/characters`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/events/:id/comics', async ctx => {
    const response = await fetch(`/events/${ctx.params.id}/comics`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/events/:id/creators', async ctx => {
    const response = await fetch(`/events/${ctx.params.id}/creators`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/events/:id/series', async ctx => {
    const response = await fetch(`/events/${ctx.params.id}/series`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/events/:id/stories', async ctx => {
    const response = await fetch(`/events/${ctx.params.id}/stories`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

