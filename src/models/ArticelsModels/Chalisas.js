// src/models/ArticelsModels/Chalisas.js

export default (sequelize, DataTypes) => {
  const Chalisas = sequelize.define("Chalisas", {
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
    openingDoha: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "opening_doha",
    },
    closeDoha: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "close_doha",
    },
    chaupai: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "chaupai",
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
    tableName: "chalisas",
  });

  return Chalisas;
};
