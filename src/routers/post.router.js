const express = require('express');
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const postMiddleware = require('../middlewares/post.middleware');

const router = express.Router();

router.post('/', authMiddleware, postMiddleware, postController.createPost);

module.exports = router;
