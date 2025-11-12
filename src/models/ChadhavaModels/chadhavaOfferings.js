// src/models/chadhavaOfferings.js

export default (sequelize, DataTypes) => {
  const chadhavaOfferings = sequelize.define("chadhavaOfferings", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    offerimg: {
      type: DataTypes.TEXT, 
      allowNull: true,
      field: "offerimg",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "title",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "description",
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "tags",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "price",
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "position",
    },
    strikePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "strike_price",
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
    chadhavaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "chadhava_id",
    },
  }, {
    tableName: "chadhava_offerings",
  });

  chadhavaOfferings.associate = (models) => {
    chadhavaOfferings.belongsTo(models.chadhava, { foreignKey: "chadhavaId" });
  };

  return chadhavaOfferings;
};