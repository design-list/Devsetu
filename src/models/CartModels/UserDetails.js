// src/models/user_details.js

export default (sequelize, DataTypes) => {
  const UserDetails = sequelize.define(
    "UserDetails",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
      },
      whatsapp: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "whatsapp",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "name",
      },
      gotra: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "gotra",
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "address",
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "postal_code",
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "city",
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "state",
      },
      // ✅ members को JSON के रूप में स्टोर करेंगे
      members: {
        type: DataTypes.JSON,
        allowNull: true,
        field: "members",
        comment: "Array of family member names",
      },
      cartId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "cart_id",
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
      tableName: "user_details",
    });

    UserDetails.associate = (models) => {
      UserDetails.belongsTo(models.cart, {
        foreignKey: "cartId",
        as: "cart",
        onDelete: "CASCADE",
      });
    };

  return UserDetails;
};
