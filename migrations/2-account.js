'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      accountNo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      PIN: {
        type: Sequelize.STRING
      },
      CustomerId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Customers'
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      accountType: {
        type: Sequelize.STRING
      },
      accountStatus: {
        type: Sequelize.STRING
      },
      balance: {
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
    await queryInterface.dropTable('Accounts');
  }
};