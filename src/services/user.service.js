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
    attributes: { exclude: ['password'] },
  });
  return usersList;
};

const getUserById = async (id) => {
  const userFound = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!userFound) {
    const error = new Error('User does not exist');
    error.status = 404;
    throw error;
  }

  return userFound;
};

module.exports = {
  registerUser,
  getUsers,
  getUserById,
};
