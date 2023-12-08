'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Account, {foreignKey : "AccountId", onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      Payment.hasOne(models.Report, {foreignKey: "PaymentId"})
      Payment.hasMany(models.PLNBilling, {foreignKey: "BillingId"})
    }
  }
  Payment.init({
    id: DataTypes.UUID,
    AccountId:DataTypes.UUID,
    transactionType: DataTypes.STRING,
    transactionDetail: DataTypes.STRING,
    fromAccountNo: DataTypes.STRING,
    toAccountNo: DataTypes.STRING,
    amount: DataTypes.BIGINT,
    currency: DataTypes.STRING,
    BillingId: DataTypes.UUID,
    customerNo: DataTypes.STRING,
    companyCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};