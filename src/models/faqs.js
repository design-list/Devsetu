// src/models/faqs.js

export default (sequelize, DataTypes) => {
  const Faqs = sequelize.define("Faqs", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "type",
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
  }, {
    tableName: "comman_faqs",
  });

  return Faqs;
};
