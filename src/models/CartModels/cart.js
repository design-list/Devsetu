// src/models/CartModels/cart.js



export default (sequelize, DataTypes) => {
  const cart = sequelize.define(
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
      grandTotal: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: "grand_total",
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
      isActivePrasad: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        field: "isActivePrasad",
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
      razorpaySignature: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "razorpay_signature",
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "payment_method",
      },
      paymentEmail: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "payment_email",
      },
      paymentContact: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "payment_contact",
      },
      upiId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "upi_id",
      },
      paymentStatusRazorpay: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "payment_status_razorpay",
      },
      paymentAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: "payment_amount",
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

  cart.associate = (models) => {
    cart.hasOne(models.CartPackage, {
      foreignKey: "cartId",
      as: "package",
      onDelete: "CASCADE",
    });
    cart.hasMany(models.CartAddOn, {
      foreignKey: "cartId",
      as: "add_ons",
      onDelete: "CASCADE",
    });
    cart.hasOne(models.UserDetails, {
      foreignKey: "cartId",
      as: "user_details",
      onDelete: "CASCADE",
    });
  };

  return cart;
};




// export default (sequelize, DataTypes) => {
//   const cart = sequelize.define(
//     "cart",
//     {
//       id: {
//         type: DataTypes.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       storeId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         field: "store_id",
//       },
//       tipAmount: {
//         type: DataTypes.FLOAT,
//         allowNull: true,
//         field: "tip_amount",
//       },
//       grandTotal: {
//         type: DataTypes.FLOAT,
//         allowNull: true,
//         field: "grand_total",
//       },
//       otherCharges: {
//         type: DataTypes.JSON,
//         allowNull: true,
//         field: "other_charges",
//         defaultValue: {
//           service_charge: 0,
//           pandit_charge: 0,
//           media_handling_charge: 0,
//         },
//       },
//       couponCode: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         field: "coupon_code",
//       },
//       isActivePrasad: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//       defaultValue: false,
//       field: "isActivePrasad",
//     },
//       // 🧾 Payment-related fields
//       paymentStatus: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: "PENDING",
//         field: "payment_status",
//       },
//       razorpayOrderId: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         field: "razorpay_order_id",
//       },
//       razorpayPaymentId: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         field: "razorpay_payment_id",
//       },
//       paidAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         field: "paid_at",
//       },

//       createdAt: {
//         type: DataTypes.DATE,
//         field: "created_at",
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         field: "updated_at",
//       },
//     },
//     {
//       tableName: "cart_list",
//     }
//   );

//   cart.associate = (models) => {
//     cart.hasOne(models.CartPackage, {
//       foreignKey: "cartId",
//       as: "package",
//       onDelete: "CASCADE",
//     });
//     cart.hasMany(models.CartAddOn, {
//       foreignKey: "cartId",
//       as: "add_ons",
//       onDelete: "CASCADE",
//     });
//     cart.hasOne(models.UserDetails, {
//       foreignKey: "cartId",
//       as: "user_details",
//       onDelete: "CASCADE",
//     });
//   };

//   return cart;
// };
