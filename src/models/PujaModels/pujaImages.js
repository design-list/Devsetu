// src/models/pujaImages.js
export default (sequelize, DataTypes) => {
  const pujaImages = sequelize.define("pujaImages", {
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
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "type",
    },
    position: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "position",
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
    tableName: "puja_images",
  });

  pujaImages.associate = (models) => {
    pujaImages.belongsTo(models.pujas, { foreignKey: "pujaId" });
  };

  return pujaImages;
};
