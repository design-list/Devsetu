// src/models/pujas.js
export default (sequelize, DataTypes) => {
  const Puja = sequelize.define("pujas", {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "title",
    },
    subTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "sub_title",
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "slug",
    },
    ratingValue: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "rating_value",
    },
    ratingReviews: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "rating_reviews",
    },
    specialDay: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "special_day",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "location",
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "date",
    },
    pujaDetails: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "puja_details",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      field: "isActive",
    },
    isActiveOnHome: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: "isActiveOnHome",
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
    tableName: "pujas",
  });

  Puja.associate = (models) => {
    Puja.hasMany(models.pujaPackages, { foreignKey: "pujaId", onDelete: "CASCADE" });
    Puja.hasMany(models.pujaOfferings, { foreignKey: "pujaId", onDelete: "CASCADE" });
    Puja.hasMany(models.pujaFaqs, { foreignKey: "pujaId", onDelete: "CASCADE" });
    Puja.hasMany(models.pujaImages, { foreignKey: "pujaId", onDelete: "CASCADE" });
    Puja.hasMany(models.templeHistory, { foreignKey: "pujaId", onDelete: "CASCADE" });
  };

  return Puja;
};
