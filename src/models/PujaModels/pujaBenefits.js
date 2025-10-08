// models/PujaModels/pujaBenefits.js

export default (sequelize, DataTypes) => {
  const pujaBenefits = sequelize.define("pujaBenefits", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "icon",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "title",
    },
    discription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "discription",
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
