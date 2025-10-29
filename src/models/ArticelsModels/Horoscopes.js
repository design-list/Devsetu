// src/models/ArticelsModels/Horoscope.js

export default (sequelize, DataTypes) => {
  const Horoscope = sequelize.define(
    "Horoscope",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
      },
      zodiac_about: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "zodiac_about",
      },
      zodiac_sign: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "zodiac_sign",
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "slug",
      },
      date_range: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "date_range",
      },
      element: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "element",
      },
      ruling_planet: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "ruling_planet",
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "symbol",
      },
      personality_snapshot: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "personality_snapshot",
      },
      strengths: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "strengths",
      },
      challenges: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "challenges",
      },
      love_relationships: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "love_relationships",
      },
      career_money: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "career_money",
      },
      health_wellness: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "health_wellness",
      },
      growth_tips: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "growth_tips",
      },
      fun_fact: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "fun_fact",
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "icon",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updated_at",
      },
    },
    {
      tableName: "zodiac_details",
    }
  );

  return Horoscope;
};
