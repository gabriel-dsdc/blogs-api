const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, User, sequelize } = require('../models');
const { verifyToken } = require('../utils/JWT');

const createPost = async ({ token, title, content, categoryIds }) => {
  const { id: userId } = await verifyToken(token);
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });
    const categoriesList = categoryIds.map((categoryId) => ({
      postId: newPost.dataValues.id,
      categoryId,
    }));
    await PostCategory.bulkCreate(categoriesList, { transaction: t });
    return newPost;
  });
  return result;
};

const blogPostIncludesObj = {
  include: [
    { as: 'user', model: User, attributes: { exclude: ['password'] } },
    { as: 'categories', model: Category, through: { attributes: [] } }],
};

const getPosts = async () => {
  const postsList = await BlogPost.findAll(blogPostIncludesObj);
  return postsList;
};

const getPostById = async (id) => {
  const postFound = await BlogPost.findByPk(id, blogPostIncludesObj);
  return postFound;
};

const editPost = async ({ token, id, title, content }) => {
  const { id: userId } = await verifyToken(token);
  const [editedPost] = await BlogPost.update({ title, content },
    { where: { id, userId } });
  if (editedPost) {
    return BlogPost.findOne({
      where: { id, userId },
      ...blogPostIncludesObj,
      });
  }
};

const deletePost = async ({ token, id }) => {
  const { id: userId } = await verifyToken(token);
  const isDeleted = await BlogPost.destroy({ where: { id, userId } });
  return isDeleted;
};

const searchPost = async ({ query }) => {
  const postsFoundList = await BlogPost.findAll({
    where: { 
    [Op.or]: [
      { title: { [Op.substring]: query } },
      { content: { [Op.substring]: query } },
    ],
   },
   ...blogPostIncludesObj,
  });
  return postsFoundList;
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  editPost,
  deletePost,
  searchPost,
};
