const Router = require('koa-router');
const axios = require('axios');
const { createParams } = require('./../services/utils');

const router = new Router();

router
  .get('/characters', async ctx => {
    const params = createParams();

    const response = await axios.get('http://gateway.marvel.com/v1/public/characters', { params });

    if (response.status !== 200) {
      ctx.throw(503, 'Server is unavailable at this time. Please try again.');
    }

    ctx.body = { data: response.data.data.results };
  })
  .get('/characters/:id', async ctx => {
    const params = createParams();

    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${ctx.params.id}`, { params });

    if (response.status !== 200) {
      ctx.throw(503, 'Server is unavailable at this time. Please try again.');
    }

    ctx.body = { data: response.data.data.results };
  });

module.exports = router;

