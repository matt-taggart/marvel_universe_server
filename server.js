require('dotenv').load();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const router = require('./src/routes');
const errorHandler = require('./src/services/errorHandler');

const { PORT = 3000 } = process.env;
const app = new Koa();

app
  .use(errorHandler())
  .use(cors({
    credentials: true,
  }))
  .use(bodyParser())
  .use(router());

app.listen(PORT);
