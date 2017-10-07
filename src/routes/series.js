const Router = require('koa-router');
const axios = require('axios');
const { createParams } = require('./../services/utils');

const router = new Router();

router
  .get('/series', async ctx => {
    const params = createParams();

    const response = await axios.get('http://gateway.marvel.com/v1/public/series', { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/series/${ctx.params.id}`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/characters', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/series/${ctx.params.id}/characters`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/comics', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/series/${ctx.params.id}/comics`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/creators', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/series/${ctx.params.id}/creators`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/events', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/series/${ctx.params.id}/events`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/series/:id/stories', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/series/${ctx.params.id}/stories`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

