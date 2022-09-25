const { verifyToken } = require('../utils/JWT');
const schemas = require('./schemas');

const loginMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  const validation = schemas.tokenSchema.validate(token);

  if (validation.error) {
    const { error: { details: [{ message }] } } = validation;
    return res.status(401).json({ message });
  }

  try {
    await verifyToken(token);
    return next();
  } catch (error) {
    error.message = 'Expired or invalid token';
    error.status = 401;
    throw error;
  }
};

module.exports = loginMiddleware;
