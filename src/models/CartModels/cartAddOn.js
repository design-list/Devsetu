// src/models/cartModels/cartAddOn.js

export default (sequelize, DataTypes) => {
  const CartAddOn = sequelize.define("cartAddOn", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "cart_id",
    },
    addOnId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "add_on_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
      field: "base_price",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
