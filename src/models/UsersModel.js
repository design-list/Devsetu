// src/models/UserModel.js

export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "UserModel",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Hashed password",
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roles: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: ["admin"],
        comment: "Array of roles like ['admin','user']",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
    { tableName: "users" }
  );

  return Users;
};
