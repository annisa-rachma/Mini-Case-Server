'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PLNBilling extends Model {
    static associate(models) {
      PLNBilling.belongsTo(models.Payment, {foreignKey : "BillingId", onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  PLNBilling.init({
    id: DataTypes.UUID,
    customerNo: DataTypes.STRING,
    customerName: DataTypes.STRING,
    billing: DataTypes.BIGINT,
    isPaid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PLNBilling',
  });
  return PLNBilling;
};