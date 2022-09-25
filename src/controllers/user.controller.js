const userService = require('../services/user.service');

const registerUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await userService.registerUser({ displayName, email, password, image });

  res.status(201).json({ token });
};

const getUsers = async (_req, res) => {
  const usersList = await userService.getUsers();

  res.status(200).json(usersList);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const userFound = await userService.getUserById(id);

  res.status(200).json(userFound);
};

module.exports = {
  registerUser,
  getUsers,
  getUserById,
};
