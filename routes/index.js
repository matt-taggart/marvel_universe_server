const compose = require('koa-compose');
const authRouter = require('./auth');
const characterRouter = require('./characters');
const keepAliveRouter = require('./keepAlive');
const userRouter = require('./users');
const Boom = require('boom');

const router = compose([
  authRouter.routes(),
  authRouter.allowedMethods({ throw: true }),
  characterRouter.routes(),
  characterRouter.allowedMethods({ throw: true }),
  keepAliveRouter.routes(),
  keepAliveRouter.allowedMethods({ throw: true }),
  userRouter.routes(),
  userRouter.allowedMethods({ throw: true }),
]);


module.exports = () => router;
