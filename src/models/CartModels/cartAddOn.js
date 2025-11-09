// src/models/cartModels/CartAddOn.js

export default (sequelize, DataTypes) => {
  const CartAddOn = sequelize.define("CartAddOn", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "cart_id",
    },
    addOnId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "add_on_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "name",
    },
    hsnCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "hsn_code",
    },
    sId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "s_id",
    },
    basePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "base_price",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    unitTaxRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "unit_tax_rate",
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
    tableName: "cart_add_ons",
  });

  CartAddOn.associate = (models) => {
    CartAddOn.belongsTo(models.cart, {
      foreignKey: "cartId",
      as: "cart",
      onDelete: "CASCADE",
    });
  };

  return CartAddOn;
};
