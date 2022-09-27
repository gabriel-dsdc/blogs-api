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

module.exports = {
  createPost,
  getPosts,
};
