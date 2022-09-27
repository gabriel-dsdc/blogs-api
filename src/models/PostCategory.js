const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
  }, {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false,
  });

  PostCategoryTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategoryTable,
      foreignKey: 'post_id',
      otherKey: 'category_id'
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategoryTable,
      foreignKey: 'category_id',
      otherKey: 'post_id'
    });
  };
  return PostCategoryTable;
};

module.exports = PostCategorySchema;
