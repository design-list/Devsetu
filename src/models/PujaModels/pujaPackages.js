// src/models/puja_packages.js
export default (sequelize, DataTypes) => {
  const pujaPackages = sequelize.define("pujaPackages", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    packImg: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "packImg",
    },
    packageType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "package_type",
    },
     packageDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "package_description",
    },
    packagePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "package_price",
    },
    noOfPeople: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
    pujaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "puja_id",
    },
  }, {
    tableName: "puja_packages",
  });

  pujaPackages.associate = (models) => {
    pujaPackages.belongsTo(models.pujas, { foreignKey: "pujaId" });
  };

  return pujaPackages;
};
