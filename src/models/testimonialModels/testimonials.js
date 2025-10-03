// src/models/testimonialModels/testimonials.js

export default (sequelize, DataTypes) => {
  const testimonials = sequelize.define("testimonials", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "designation",
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "message",
    },
    rating: {
      type: DataTypes.INTEGER, // 1 to 5 stars
      allowNull: true,
      field: "rating",
    },
    image: {
      type: DataTypes.STRING, // URL of profile image
      allowNull: true,
      field: "image",
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
    tableName: "testimonials",
  });

  return testimonials;
};
