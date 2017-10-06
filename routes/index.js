const compose = require('koa-compose');
const authRouter = require('./auth');
const characterRouter = require('./characters');
const keepAliveRouter = require('./keepAlive');
const userRouter = require('./users');
const comicRouter = require('./comics');
const creatorRouter = require('./creators');
const eventRouter = require('./events');
const seriesRouter = require('./series');
const storiesRouter = require('./stories');

const router = compose([
  authRouter.routes(),
  authRouter.allowedMethods({ throw: true }),
  characterRouter.routes(),
  characterRouter.allowedMethods({ throw: true }),
  keepAliveRouter.routes(),
  keepAliveRouter.allowedMethods({ throw: true }),
  userRouter.routes(),
  userRouter.allowedMethods({ throw: true }),
  comicRouter.routes(),
  comicRouter.allowedMethods({ throw: true }),
  creatorRouter.routes(),
  creatorRouter.allowedMethods({ throw: true }),
  eventRouter.routes(),
  eventRouter.allowedMethods({ throw: true }),
  seriesRouter.routes(),
  seriesRouter.allowedMethods({ throw: true }),
  storiesRouter.routes(),
  storiesRouter.allowedMethods({ throw: true }),
]);


module.exports = () => router;
