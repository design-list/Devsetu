export default (sequelize, DataTypes) => {
  const pujaFaqs = sequelize.define("pujaFaqs", {
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
    question: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "question",
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "answer",
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
    tableName: "puja_faqs",
  });

  pujaFaqs.associate = (models) => {
    pujaFaqs.belongsTo(models.pujas, { foreignKey: "pujaId" });
  };

  return pujaFaqs;
};
