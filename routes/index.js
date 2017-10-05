const compose = require('koa-compose');
const authRouter = require('./auth');
const characterRouter = require('./characters');
const keepAliveRouter = require('./keepAlive');
const userRouter = require('./users');

const router = compose([
  authRouter.routes(),
  authRouter.allowedMethods(),
  characterRouter.routes(),
  characterRouter.allowedMethods(),
  keepAliveRouter.routes(),
  keepAliveRouter.allowedMethods(),
  userRouter.routes(),
  userRouter.allowedMethods(),
]);


module.exports = () => router;
