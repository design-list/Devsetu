// src/models/WhatsappOtp.js

export default (sequelize, DataTypes) => {
  const WhatsAppOtp = sequelize.define(
    "WhatsAppOtp",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "phone_number",
        comment: "User WhatsApp number (include country code, e.g. +91)",
      },
      otp: {
        type: DataTypes.STRING(6),
        allowNull: false,
        comment: "6-digit OTP sent via WhatsApp",
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "When this OTP will expire (10 minutes from creation)",
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "True if OTP has been verified",
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
      tableName: "whatsapp_otp_verification",
    }
  );

  // Set expiry to 2 minutes
  WhatsAppOtp.beforeCreate((otpInstance) => {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 2);
    otpInstance.expiresAt = expiry;
  });

  return WhatsAppOtp;
};
