// src/models/offerings.js

export default (sequelize, DataTypes) => {
  const offerings = sequelize.define("offerings", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "type",
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "price",
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
    tableName: "offerings",
  });

  return offerings;
};