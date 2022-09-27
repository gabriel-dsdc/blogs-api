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

const getPosts = async () => {
  const postsList = await BlogPost.findAll({
    include: [
      { as: 'user', model: User, attributes: { exclude: ['password'] } },
      { as: 'categories', model: Category, through: { attributes: [] } }],
  });
  return postsList;
};

const getPostById = async (id) => {
  const postFound = await BlogPost.findByPk(id, {
    include: [
      { as: 'user', model: User, attributes: { exclude: ['password'] } },
      { as: 'categories', model: Category, through: { attributes: [] } }],
  });
  return postFound;
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};
