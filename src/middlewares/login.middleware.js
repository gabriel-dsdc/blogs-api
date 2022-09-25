const schemas = require('./schemas');

const loginMiddleware = async (req, res, next) => {
  const validation = schemas.loginSchema.validate(req.body);
  if (!validation.error) return next();

  const { error: { details: [{ message }] } } = validation;
  
  res.status(400).json({ message });
};

module.exports = loginMiddleware;
