'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      Report.belongsTo(models.Account, {foreignKey : "AccountId", onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      Report.belongsTo(models.Transaction, {foreignKey : "TransactionId", onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  Report.init({
    // id: DataTypes.UUID,
    AccountId: DataTypes.UUID,
    TransactionId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};