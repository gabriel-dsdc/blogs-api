const { Category } = require('../models');

const createCategory = async ({ name }) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getCategories = async () => {
  const categoriesList = await Category.findAll();
  return categoriesList;
};

module.exports = {
  createCategory,
  getCategories,
};
