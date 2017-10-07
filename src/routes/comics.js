const Router = require('koa-router');
const { fetch } = require('./../services/utils');

const router = new Router();

router
  .get('/comics', async ctx => {
    const response = await fetch('/comics');

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/comics/:id', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/comics/:id/characters', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}/characters`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/comics/:id/creators', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}/creators`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/comics/:id/events', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}/events`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/comics/:id/stories', async ctx => {
    const response = await fetch(`/comics/${ctx.params.id}/stories`);

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

