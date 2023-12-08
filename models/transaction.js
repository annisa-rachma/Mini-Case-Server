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
    // id: DataTypes.UUID,
    AccountId:DataTypes.UUID,
    transactionType: DataTypes.STRING,
    transactionDetail: DataTypes.STRING,
    fromAccountNo: DataTypes.STRING,
    toAccountNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Rekening tujuan tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Rekening tujuan tidak boleh kosong'
        }
      }
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nominal tidak boleh nol'
        },
        notEmpty: {
          msg: 'Nominal tidak boleh nol'
        }
      }
    },
    currency: DataTypes.STRING,
    destinationBankCode: DataTypes.STRING,
    fee: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};