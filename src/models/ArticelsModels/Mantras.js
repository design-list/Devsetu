// src/models/ArticelsModels/Mantras.js

export default (sequelize, DataTypes) => {
  const Mantras = sequelize.define(
    "Mantras",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
      },

      // Example: "Lord Ganesha", "Goddess Radha", "Lord Narayan"
      lordName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "lord_name",
      },

      // Example: "Lord Ganesha Mantras - Final"
      title: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "title",
      },

      slug: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "slug",
      },

      // Short introduction paragraph
      introduction: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "introduction",
      },

      // Array of mantras in JSON string form:
      // Each mantra object = { mantraTitle, mantraText, meaning }
      mantrasList: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "mantras_list",
        get() {
          const value = this.getDataValue("mantrasList");
          try {
            return JSON.parse(value);
          } catch (e) {
            return [];
          }
        },
        set(value) {
          this.setDataValue("mantrasList", JSON.stringify(value));
        },
      },

      // Full significance text
      significance: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "significance",
      },

      // Optional thumbnail / icon image
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "icon",
      },

      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },

      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      tableName: "mantras",
    }
  );

  return Mantras;
};
