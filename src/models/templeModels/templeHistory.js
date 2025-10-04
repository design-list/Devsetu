// src/models/templeModels/templeHistory.js

export default (sequelize, DataTypes) => {
  const TempleHistory = sequelize.define("templeHistory", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    templeImg: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "temple_img",
    },
    templeName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "temple_name",
    },
    templeHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "temple_history",
    },
    pujaId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "puja_id",
    },
    chadhavaId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "chadhava_id",
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
    tableName: "temple_history",
  });

  TempleHistory.associate = (models) => {
    if (models.pujas) {
      TempleHistory.belongsTo(models.pujas, { foreignKey: "pujaId", onDelete: "CASCADE" });
    }
    if (models.chadhava) {
      TempleHistory.belongsTo(models.chadhava, { foreignKey: "chadhavaId", onDelete: "CASCADE" });
    }
  };

  return TempleHistory;
};
