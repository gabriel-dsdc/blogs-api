const loginService = require('../services/login.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await loginService.login({ email, password });

  res.status(200).json({ token });
};

module.exports = {
  login,
};
