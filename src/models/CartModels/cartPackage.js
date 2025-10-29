// src/models/cartModels/CartPackage.js

export default (sequelize, DataTypes) => {
  const CartPackage = sequelize.define("CartPackage", {
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
    packageId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "package_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "name",
    },
    productId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "product_id",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "product_type",
    },
    productTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "product_title",
    },
    productSlug: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "product_slug",
    },
    productImg: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "product_img",
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
      field: "package_price",
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
    tableName: "cart_package",
  });

  CartPackage.associate = (models) => {
    CartPackage.belongsTo(models.cart, {
      foreignKey: "cartId",
      as: "cart",
      onDelete: "CASCADE",
    });
  };

  return CartPackage;
};
