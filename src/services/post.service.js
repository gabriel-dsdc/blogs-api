const { BlogPost, PostCategory, sequelize } = require('../models');
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

module.exports = {
  createPost,
};
