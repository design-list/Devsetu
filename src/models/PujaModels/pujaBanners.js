// src/models/pujaBanners.js
export default (sequelize, DataTypes) => {
  const pujaBanners = sequelize.define("pujaBanners", {
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

    pujaBanners.associate = (models) => {
    pujaBanners.belongsTo(models.pujas, { foreignKey: "pujaId" });
  };

  return pujaBanners;
};
