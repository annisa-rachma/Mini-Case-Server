'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      AccountId : {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Accounts'
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      transactionType: {
        type: Sequelize.STRING
      },
      transactionDetail: {
        type: Sequelize.STRING
      },
      fromAccountNo: {
        type: Sequelize.STRING,
      },
      toAccountNo: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.BIGINT
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destinationBankCode: {
        type: Sequelize.STRING
      },
      fee: {
        type: Sequelize.BIGINT
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