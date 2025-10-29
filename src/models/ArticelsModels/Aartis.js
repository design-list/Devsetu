// src/models/ArticelsModels/Aartis.js

export default (sequelize, DataTypes) => {
  const Aartis = sequelize.define("Aartis", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "title",
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "slug",
    },
    aboutArticle: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "about_article",
    },
    aartis: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "aartis",
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  }, {
    tableName: "aartis",
  });

  return Aartis;
};
