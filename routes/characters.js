const Router = require('koa-router');
const axios = require('axios');
const { createParams } = require('./../services/utils');

const router = new Router();

router
  .get('/characters', async ctx => {
    const params = createParams();

    const response = await axios.get('http://gateway.marvel.com/v1/public/characters', { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${ctx.params.id}`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id/comics', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${ctx.params.id}/comics`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id/events', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${ctx.params.id}/events`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id/series', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${ctx.params.id}/series`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id/stories', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${ctx.params.id}/stories`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

