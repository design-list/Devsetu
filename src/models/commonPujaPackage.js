// src/models/commonPujaPackage.js

export default (sequelize, DataTypes) => {
  const commonPujaPackage = sequelize.define("commonPujaPackage", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    packImg: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "packImg",
    },
    packageType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "package_type",
    },
    packageDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "package_description",
    },
    packagePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "package_price",
    },
    noOfPeople: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "no_of_people",
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
    tableName: "common_pujapackage",
  });

  return commonPujaPackage;
};
