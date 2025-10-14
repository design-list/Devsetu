// models/PujaModels/pujaBenefits.js

export default (sequelize, DataTypes) => {
  const pujaBenefits = sequelize.define("pujaBenefits", {
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
      type: DataTypes.TEXT,
      allowNull: true,
      field: "description",
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
    tableName: "puja_benefits",
  });

    pujaBenefits.associate = (models) => {
    pujaBenefits.belongsTo(models.pujas, { foreignKey: "pujaId" });
  };

  return pujaBenefits;
};
