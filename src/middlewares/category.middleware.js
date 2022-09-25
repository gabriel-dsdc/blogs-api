const schemas = require('./schemas');

const categoryMiddleware = async (req, res, next) => {
  const validation = schemas.categorySchema.validate(req.body);
  if (!validation.error) return next();

  const { error: { details: [{ message }] } } = validation;

  return res.status(400).json({ message });
};

module.exports = categoryMiddleware;
