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
      allowNull: true,
      field: "currency",
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "tags",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "price",
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "position",
    },
    strikePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "strike_price",
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
    chadhavaPackages.belongsTo(models.chadhava, { foreignKey: "chadhavaId" });
  };

  return chadhavaPackages;
};
