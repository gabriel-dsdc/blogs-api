const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => (
  jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  }));

const verifyToken = async (token) => jwt.verify(token, TOKEN_SECRET);

module.exports = {
  generateToken,
  verifyToken,
};
