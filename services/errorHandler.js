const Boom = require('boom');

module.exports = () => (
  async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      const statusCode = e.status || e.statusCode || 500;
      ctx.status = statusCode;
      ctx.body = Boom.boomify(e, { statusCode }).output.payload;
      ctx.app.emit('error', e, ctx);
    }
  }
);
