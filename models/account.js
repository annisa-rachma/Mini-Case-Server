'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.Customer, {foreignKey : "CustomerId", onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      Account.hasMany(models.Transaction, {foreignKey: "AccountId"})
      Account.hasMany(models.Report, {foreignKey: "AccountId"})
    }
  }
  Account.init({
    id: DataTypes.UUID,
    accountNo: DataTypes.STRING,
    PIN: DataTypes.STRING,
    CustomerId: DataTypes.UUID,
    accountType: DataTypes.STRING,
    accountStatus: DataTypes.STRING,
    balance: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};