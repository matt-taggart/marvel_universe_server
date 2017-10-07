const Router = require('koa-router');
const { fetch } = require('./../services/utils');

const router = new Router();

router
  .get('/series', async ctx => {
    const response = await fetch('/series');

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/characters', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/characters`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/comics', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/comics`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/creators', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/creators`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/events', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/events`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/stories', async ctx => {
    const response = await fetch(`/series/${ctx.params.id}/stories`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

