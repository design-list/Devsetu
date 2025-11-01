export default (sequelize, DataTypes) => {
  const chadhavaFocus = sequelize.define("chadhavaFocus", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    focusIcon: {
      type: DataTypes.STRING,
      allowNull: true,        
      field: "focus_icon",
    },
    foucs: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "foucs",
    },
    chadhavaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "chadhava_id",
    },
  }, {
    tableName: "chadhava_focus",
  });

  chadhavaFocus.associate = (models) => {
    chadhavaFocus.belongsTo(models.chadhava, { foreignKey: "chadhavaId" });
  };

  return chadhavaFocus;
};
