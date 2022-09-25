const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const login = async ({ email, password }) => {
  const hasUser = await User.findOne({
    attributes: ['id', 'display_name', 'email'],
    where: { email, password },
  });
  
  if (!hasUser) {
    const error = new Error('Invalid fields');
    error.status = 400;
    throw error;
  }
  const token = generateToken({
    id: hasUser.dataValues.id,
    email: hasUser.dataValues.email,
    displayName: hasUser.dataValues.display_name,
  });

  return token;
};

module.exports = {
  login,
};
