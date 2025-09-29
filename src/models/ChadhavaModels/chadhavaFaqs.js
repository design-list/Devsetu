export default (sequelize, DataTypes) => {
  const chadhavaFaqs = sequelize.define("chadhavaFaqs", {
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
      allowNull: false,
      field: "question",
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "answer",
    },
    chadhavaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "chadhava_id",
    },
  }, {
    tableName: "chadhava_faqs",
  });

  chadhavaFaqs.associate = (models) => {
    chadhavaFaqs.belongsTo(models.pujas, { foreignKey: "chadhavaId" });
  };

  return chadhavaFaqs;
};
