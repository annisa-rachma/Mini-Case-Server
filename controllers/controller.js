const {
  Account,
  Customer,
  Report,
  Transaction,
  sequelize,
} = require("../models");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { signToken, verifyToken } = require("../helper/jwt");
const { Op } = require("sequelize");
const { stringToDate } = require("../helper/stringToDate");

class Controller {
  static async loginAccount(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "InvalidInput" };

      const user = await Customer.findOne({ where: { email } });
      if (!user) throw { name: "InvalidEmail/Password" };

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: "InvalidEmail/Password" };

      const access_token = signToken({ id: user.id });

      // console.log(access_token, '<<<dari server')
      res.status(200).json(access_token);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAccountDetail(req, res, next) {
    try {
      const account = await Account.findOne({
        where: { CustomerId: req.user.id },
        include: [
          {
            model: Customer,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password",],
            },
          },
        ],
        attributes: {
          exclude: ["PIN"],
        },
      });

      res.status(200).json(account);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { toAccountNo, amount, PIN } = req.body;

      const account = await Account.findOne({
        where: { CustomerId: req.user.id },
      });
      const AccountId = account.id;
      let currency = "IDR";
      let transactionDetail  
      let transactionType;
      let fromAccountNo;
      let trans

      if(PIN == account.PIN) {
        if (toAccountNo == account.accountNo) {
          transactionType = "Kredit";
          fromAccountNo = "";
          transactionDetail = "Transfer Masuk"
          await Account.update(
            { balance: Number(account.balance) + Number(amount) },
            { where: { accountNo: toAccountNo } },
            { transaction: t }
          );
  
          trans = await Transaction.create(
            {
              AccountId,
              transactionType,
              transactionDetail,
              fromAccountNo,
              toAccountNo,
              amount,
              currency,
            },
            { transaction: t }
          );
        } else {
          transactionType = "Debet";
          fromAccountNo = account.accountNo;
          transactionDetail = "Transfer Keluar"
          await Account.update(
            { balance: Number(account.balance) - Number(amount) },
            { where: { id: account.id } },
            { transaction: t }
          );
  
          trans = await Transaction.create(
            {
              AccountId,
              transactionType,
              transactionDetail,
              fromAccountNo,
              toAccountNo,
              amount,
              currency,
            },
            { transaction: t }
          );
        }
      } else {
        return res.status(401).json({message : "Invalid PIN"});
      }

      t.commit();
      res.status(201).json(trans);
    } catch (err) {
      console.log(err);
      t.rollback();
      next(err);
    }
  }

  static async postPayment(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {  PIN } = req.body;
      // console.log(PIN)
      const toAccountNo = 'PLN'
      const transactionDetail = "Pembayaran Listrik"
      const amount = 5000000
      const fee = 7500

      const account = await Account.findOne({
        where: { CustomerId: req.user.id },
      });
      const AccountId = account.id;
      let currency = "IDR";
      let transactionType= "Debet";
      let fromAccountNo = account.accountNo;
      let transaction = []

      if(PIN == account.PIN) {
        await Account.update(
          { balance: account.balance - (amount + fee) },
          { where: { id: account.id } },
          { transaction: t }
        );
        const bill = await Transaction.create(
          {
            AccountId,
            transactionType,
            transactionDetail,
            fromAccountNo,
            toAccountNo,
            amount,
            currency,
          },
          { transaction: t }
        );
        const adminFee = await Transaction.create(
          {
            AccountId,
            transactionType,
            transactionDetail : "Biaya Admin",
            fromAccountNo,
            toAccountNo,
            amount : fee,
            currency,
          },
          { transaction: t }
        );

        transaction.push(bill, adminFee)
      } else {
        return res.status(401).json({message : "Invalid PIN"});
      }
      

      t.commit();
      res.status(201).json({message : "Payment Success", transaction});
    } catch (err) {
      console.log(err);
      t.rollback();
      next(err);
    }
  }

  static async getReport(req, res, next) {
    try {
      const account = await Account.findOne({
        where: { CustomerId: req.user.id },
      });
      const { startDate, endDate } = req.query;

      let periode;
      let option = {
        where: {
          AccountId: account.id,
        },
        order: [["createdAt", "DESC"]],
      };

      if (startDate || endDate) {
        periode = `${startDate} - ${endDate}`;
        option.where.createdAt = {
          [Op.between]: [stringToDate(startDate), stringToDate(endDate)],
        };
      } else {
        periode = "Semua";
      }

      const report = await Transaction.findAll(option);

      let endingBalance = parseInt(account.balance);
      let openingBalance = parseInt(account.balance);

      

      report.forEach((transaction) => {
        const amount = parseInt(transaction.amount);

        if (transaction.transactionType === "Kredit") {
          openingBalance -= amount;
        } else if (transaction.transactionType === "Debet") {
          openingBalance += amount;
        } else {
          openingBalance = amount
        }
      });

      if(startDate || endDate) {
        endingBalance = openingBalance
        report.forEach((transaction) => {
          const amount = parseInt(transaction.amount);
  
          if (transaction.transactionType === "Kredit") {
            endingBalance += amount;
          } else if (transaction.transactionType === "Debet") {
            endingBalance -= amount;
          } 
        });
      }

      res.status(200).json({
        accountNo: account.accountNo,
        accountName: `${req.user.firstName} ${req.user.lastName}`,
        periode,
        tanggalInquiry: new Date(),
        openingBalance,
        endingBalance,
        report,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
