const Router = require('koa-router');
const axios = require('axios');
const { createParams } = require('./../services/utils');

const router = new Router();

router
  .get('/creators', async ctx => {
    const params = createParams();

    const response = await axios.get('http://gateway.marvel.com/v1/public/creators', { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/creators/${ctx.params.id}`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/comics', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/creators/${ctx.params.id}/comics`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/events', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/creators/${ctx.params.id}/events`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/series', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/creators/${ctx.params.id}/series`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/creators/:id/stories', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/creators/${ctx.params.id}/stories`, { params });

    if (response.status !== 200) {
      ctx.throw(503);
    }

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

