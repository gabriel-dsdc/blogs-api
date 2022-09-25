const schemas = require('./schemas');

const userMiddleware = async (req, res, next) => {
  const validation = schemas.userSchema.validate(req.body);
  if (!validation.error) return next();

  const { error: { details: [{ message }] } } = validation;

  return res.status(400).json({ message });
};

module.exports = userMiddleware;
