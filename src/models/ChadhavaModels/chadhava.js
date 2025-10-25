// src/models/chadhava.js

export default (sequelize, DataTypes) => {
  const chadhava = sequelize.define("chadhava", {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "title",
    },
    subTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "sub_title",
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "slug",
    },
    ratingValue: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "rating_value",
    },
    ratingReviews: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "rating_reviews",
    },
    specialDay: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "special_day",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "location",
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "date",
    },
    pujaDetails: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "chadhava_details",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      field: "isActive",
    },
    isActiveOnHome: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: "isActiveOnHome",
    },
    isRecommended: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: "common_recommended",
    },
    isActivePandit: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: "isActive_pandit",
    },
    commonFaqs: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: "common_faqs",
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
    tableName: "chadhava",
  });

  chadhava.associate = (models) => {
    chadhava.hasMany(models.recommendedChadawa, { foreignKey: "chadhavaId", onDelete: "CASCADE" });
    chadhava.hasMany(models.chadhavaPackages, { foreignKey: "chadhavaId", onDelete: "CASCADE" });
    chadhava.hasMany(models.chadhavaFaqs, { foreignKey: "chadhavaId", onDelete: "CASCADE" });
    chadhava.hasMany(models.chadhavaBanner, { foreignKey: "chadhavaId", onDelete: "CASCADE" });
    chadhava.hasMany(models.pujaPerformed, { foreignKey: "chadhavaId", onDelete: "CASCADE" });
    chadhava.hasMany(models.templeHistory, { foreignKey: "chadhavaId", onDelete: "CASCADE" });
    chadhava.hasMany(models.chadhavaOfferings, { foreignKey: "chadhavaId", onDelete: "CASCADE" });
  };

  return chadhava;
};
