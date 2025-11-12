
// src/models/recommendedChadawa.js
export default (sequelize, DataTypes) => {
  const recommendedChadawa = sequelize.define("recommendedChadawa", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    recommendedImg: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "title",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "status",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "location",
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "currency",
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "date",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "price",
    },
    chadhavaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "chadhava_id",
    },
  }, {
    tableName: "recommended_chadawa",
  });

  recommendedChadawa.associate = (models) => {
    recommendedChadawa.belongsTo(models.chadhava, { foreignKey: "chadhavaId" });
  };

  return recommendedChadawa;
};

