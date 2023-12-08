'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init({
    id: DataTypes.UUID,
    transactionType: DataTypes.STRING,
    transactionDetail: DataTypes.STRING,
    fromAccountNo: DataTypes.STRING,
    toAccountNo: DataTypes.STRING,
    amount: DataTypes.BIGINT,
    currency: DataTypes.STRING,
    customerNo: DataTypes.STRING,
    CompanyId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};