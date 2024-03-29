const express = require('express');
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', userMiddleware, userController.registerUser);
router.get('/', authMiddleware, userController.getUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.delete('/me', authMiddleware, userController.deleteUser);

module.exports = router;
