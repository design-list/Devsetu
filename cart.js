// src/models/CartModels/cart.js
export default (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      storeId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "store_id",
      },
      tipAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: "tip_amount",
      },
      otherCharges: {
        type: DataTypes.JSON,
        allowNull: true,
        field: "other_charges",
        defaultValue: {
          service_charge: 0,
          pandit_charge: 0,
          media_handling_charge: 0,
        },
      },
      couponCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "coupon_code",
      },

      // 🧾 Payment-related fields
      paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "PENDING",
        field: "payment_status",
      },
      razorpayOrderId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "razorpay_order_id",
      },
      razorpayPaymentId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "razorpay_payment_id",
      },
      paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "paid_at",
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
      tableName: "cart_list",
    }
  );

  Cart.associate = (models) => {
    Cart.hasOne(models.cartPackage, {
      foreignKey: "cartId",
      as: "package",
      onDelete: "CASCADE",
    });
    Cart.hasMany(models.cartAddOn, {
      foreignKey: "cartId",
      as: "add_ons",
      onDelete: "CASCADE",
    });
    Cart.hasOne(models.UserDetails, {
      foreignKey: "cartId",
      as: "user_details",
      onDelete: "CASCADE",
    });
  };

  return Cart;
};



















// //src/models/cartModels/cart.js

// export default (sequelize, DataTypes) => {
//   const Cart = sequelize.define("cart", {
//     id: {
//       type: DataTypes.BIGINT,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     storeId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       field: "store_id",
//     },
//     tipAmount: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//       field: "tip_amount",
//     },
//     otherCharges: {
//       type: DataTypes.JSON,
//       allowNull: true,
//       field: "other_charges",
//       defaultValue: {
//         service_charge: 0,
//         pandit_charge: 0,
//         media_handling_charge: 0,
//       },
//     },
//     couponCode: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: "coupon_code",
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       field: "created_at",
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       field: "updated_at",
//     },
//   }, {
//     tableName: "cart_list",
//   });

//   Cart.associate = (models) => {
//     Cart.hasOne(models.cartPackage, {
//       foreignKey: "cartId",
//       as: "package",
//       onDelete: "CASCADE",
//     });
//     Cart.hasMany(models.cartAddOn, {
//       foreignKey: "cartId",
//       as: "add_ons",
//       onDelete: "CASCADE",
//     });
//     Cart.hasOne(models.UserDetails, {
//       foreignKey: "cartId",
//       as: "user_details",
//       onDelete: "CASCADE",
//     });
//   };

//   return Cart;
// };
