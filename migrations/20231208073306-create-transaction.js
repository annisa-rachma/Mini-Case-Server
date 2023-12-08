'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      transactionType: {
        type: Sequelize.STRING
      },
      transactionDetail: {
        type: Sequelize.STRING
      },
      fromAccountNo: {
        type: Sequelize.STRING
      },
      toAccountNo: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.BIGINT
      },
      currency: {
        type: Sequelize.STRING
      },
      destinationBankCode: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};