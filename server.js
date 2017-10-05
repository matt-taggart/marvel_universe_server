require('dotenv').load();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const router = require('./routes');
const errorHandler = require('./services/errorHandler');

const { PORT = 3000 } = process.env;
const app = new Koa();

app
  .use(errorHandler())
  .use(cors())
  .use(bodyParser())
  .use(router());

app.listen(PORT);
