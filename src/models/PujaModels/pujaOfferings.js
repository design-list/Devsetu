// src/models/puja_offerings.js
export default (sequelize, DataTypes) => {
  const pujaOfferings = sequelize.define("pujaOfferings", {
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
    pujaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "puja_id",
    },
  }, {
    tableName: "puja_offerings",
  });

  pujaOfferings.associate = (models) => {
    pujaOfferings.belongsTo(models.pujas, { foreignKey: "pujaId" });
  };

  return pujaOfferings;
};