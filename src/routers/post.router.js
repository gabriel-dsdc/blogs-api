const express = require('express');
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const postMiddlewares = require('../middlewares/post.middleware');

const router = express.Router();

router.post('/', authMiddleware, postMiddlewares.postMiddleware, postController.createPost);
router.get('/', authMiddleware, postController.getPosts);
router.get('/search', authMiddleware, postController.searchPost);
router.get('/:id', authMiddleware, postController.getPostById);
router.put('/:id', authMiddleware, postMiddlewares.editPostMiddleware, postController.editPost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
