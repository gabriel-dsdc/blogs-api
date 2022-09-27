const schemas = require('./schemas');
const categoryService = require('../services/category.service');

const postMiddleware = async (req, res, next) => {
  const validation = schemas.postSchema.validate(req.body);
  if (validation.error) {
    const { error: { details: [{ message }] } } = validation;
    return res.status(400).json({ message });
  }

  const { categoryIds } = req.body;
  const categoriesList = await categoryService.getCategories();
  const hasCategory = categoriesList.some((category) => (
    categoryIds.includes(category.dataValues.id)));
  if (!hasCategory) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  return next();
};

module.exports = postMiddleware;
