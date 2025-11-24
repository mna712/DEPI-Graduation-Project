
const asyncWrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (!res.headersSent) {
      next(err);
    }
  });
};
export default asyncWrapper;

