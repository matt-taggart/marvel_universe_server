const Boom = require('boom');

module.exports = () => (
  async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      if (e) {
        const statusCode = e.status || e.statusCode || 500;
        if (statusCode === 405) {
          ctx.status = statusCode;
          ctx.body = Boom.methodNotAllowed().output.payload;
          return;
        }
        ctx.status = statusCode;
        ctx.body = Boom.boomify(e, { statusCode }).output.payload;
        ctx.app.emit('error', e, ctx);
      }
    }
    ctx.status = 404;
    ctx.body = Boom.notFound().output.payload;
  }
);
