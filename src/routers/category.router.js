const express = require('express');
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const categoryMiddleware = require('../middlewares/category.middleware');

const router = express.Router();

router.post('/', authMiddleware, categoryMiddleware, categoryController.createCategory);
router.get('/', authMiddleware, categoryController.getCategories);

module.exports = router;
