'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Account, {foreignKey : "AccountId", onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      Transaction.hasOne(models.Report, {foreignKey: "TransactionId"})
    }
  }
  Transaction.init({
    id: DataTypes.UUID,
    AccountId:DataTypes.UUID,
    transactionType: DataTypes.STRING,
    transactionDetail: DataTypes.STRING,
    fromAccountNo: DataTypes.STRING,
    toAccountNo: DataTypes.STRING,
    amount: DataTypes.BIGINT,
    currency: DataTypes.STRING,
    destinationBankCode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};