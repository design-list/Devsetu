
// src/models/pujaPerformed.js
export default (sequelize, DataTypes) => {
  const pujaPerformed = sequelize.define("pujaPerformed", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    pujaPerformerImg: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "name",
    },
    temple: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "temple",
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "bio",
    },
    chadhavaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "chadhava_id",
    },
  }, {
    tableName: "puja_performed",
  });

  pujaPerformed.associate = (models) => {
    pujaPerformed.belongsTo(models.chadhava, { foreignKey: "chadhavaId" });
  };

  return pujaPerformed;
};