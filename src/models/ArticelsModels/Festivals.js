// src/models/ArticelsModels/Festivals.js

export default (sequelize, DataTypes) => {
  const Festivals = sequelize.define("Festivals", {
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
    aboutArticle: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "about_article",
    },
    divineForm: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "divine_form",
    },
    sacredRituals: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "sacred_rituals",
    },
    regionalFaith : {
      type: DataTypes.STRING,
      allowNull: true,
      field: "regional_faith",
    },
    festivalFaithWellness : {
      type: DataTypes.STRING,
      allowNull: true,
      field: "festival_faith_wellness",
    },
    dateAndMonth: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "date_and_month",
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
    tableName: "festivals",
  });

  return Festivals;
};
