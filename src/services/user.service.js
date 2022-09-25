const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const registerUser = async ({ displayName, email, password, image }) => {
  const hasEmail = await User.findOne({ attributes: ['email'], where: { email } });

  if (hasEmail) {
    const error = new Error('User already registered');
    error.status = 409;
    throw error;
  }
  await User.create({ displayName, email, password, image });
  const token = generateToken({ displayName, email, password });

  return token;
};

const getUsers = async () => {
  const usersList = await User.findAll({
    attributes: ['id', ['display_name', 'displayName'], 'email', 'image'],
  });
  return usersList;
};

module.exports = {
  registerUser,
  getUsers,
};
