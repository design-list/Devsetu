// src/models/chadhavaPackages.js
export default (sequelize, DataTypes) => {
  const chadhavaPackages = sequelize.define("chadhavaPackages", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "title",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "description",
    },
    packImg: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "packImg",
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "currency",
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "tags",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "price",
    },
    chadhavaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "chadhava_id",
    },
  }, {
    tableName: "chadhava_packages",
  });

  chadhavaPackages.associate = (models) => {
    chadhavaPackages.belongsTo(models.pujas, { foreignKey: "chadhavaId" });
  };

  return chadhavaPackages;
};
