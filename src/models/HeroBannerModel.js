// src/models/HeroBannerModel.js
export default (sequelize, DataTypes) => {
  const HeroBannerModel = sequelize.define("HeroBannerModel", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image_url",
    },
    mobileImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "mobile_image_url",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "type",
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "slug",
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
    tableName: "hero_banner",
  });

  return HeroBannerModel;
};
