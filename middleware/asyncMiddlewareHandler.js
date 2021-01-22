function asyncMiddlewareHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = asyncMiddlewareHandler;
