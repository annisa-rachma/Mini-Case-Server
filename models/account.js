'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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