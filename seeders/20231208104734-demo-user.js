'use strict';
const {hashPassword} = require('../helper/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataCustomer = require('../data/customer.json').map((el) => {
      el.password = hashPassword(el.password)
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    const dataAccount = require('../data/account.json').map((el) => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    // const dataTransaction = [
    //   {
    //     id: "b7537e28-3474-4e3f-a7f9-40975114e89d",
    //     AccountId: "a9ac35a3-11a0-4f88-b383-d452a03bdd5d",
    //     transactionType: 'Kredit',
    //     transactionDetail: "Penyetoran Tunai",
    //     fromAccountNo: "",
    //     toAccountNo: "9599211230",
    //     amount: 500000000,
    //     currency: "IDR"
    //   }
    // ]

    await queryInterface.bulkInsert('Customers', dataCustomer);
    await queryInterface.bulkInsert('Accounts', dataAccount);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accounts', null, {});
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
