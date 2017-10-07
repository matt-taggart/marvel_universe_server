const Router = require('koa-router');
const axios = require('axios');
const { createParams } = require('./../services/utils');

const router = new Router();

router
  .get('/stories', async ctx => {
    const params = createParams();

    const response = await axios.get('http://gateway.marvel.com/v1/public/stories', { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/stories/${ctx.params.id}`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/characters', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/stories/${ctx.params.id}/characters`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/comics', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/stories/${ctx.params.id}/comics`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/creators', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/stories/${ctx.params.id}/creators`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/events', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/stories/${ctx.params.id}/events`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/stories/:id/series', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/stories/${ctx.params.id}/series`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

