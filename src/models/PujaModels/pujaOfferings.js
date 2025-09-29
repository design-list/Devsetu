// src/models/puja_offerings.js
export default (sequelize, DataTypes) => {
  const pujaOfferings = sequelize.define("pujaOfferings", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    offerimg: {
      type: DataTypes.TEXT, 
      allowNull: false,
      field: "offerimg",
      get() {
        const rawValue = this.getDataValue('offerimg');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('offerimg', JSON.stringify(value));
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "title",
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "description",
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
    tableName: "puja_offerings",
  });

  pujaOfferings.associate = (models) => {
    pujaOfferings.belongsTo(models.pujas, { foreignKey: "pujaId" });
  };

  return pujaOfferings;
};