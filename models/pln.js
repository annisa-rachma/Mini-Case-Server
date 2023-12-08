'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PLN extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PLN.init({
    id: DataTypes.UUID,
    customerNo: DataTypes.STRING,
    billing: DataTypes.BIGINT,
    isPaid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PLN',
  });
  return PLN;
};