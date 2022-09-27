const postService = require('../services/post.service');

const createPost = async (req, res) => {
  const token = req.header('Authorization');
  const { title, content, categoryIds } = req.body;
  const newBlogPost = await postService.createPost({ token, title, content, categoryIds });

  res.status(201).json(newBlogPost);
};

const getPosts = async (_req, res) => {
  const postsList = await postService.getPosts();

  res.status(200).json(postsList);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const postFound = await postService.getPostById(id);

  if (!postFound) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  res.status(200).json(postFound);
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};
