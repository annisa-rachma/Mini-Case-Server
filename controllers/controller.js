const {
  Account,
  Customer,
  Report,
  Transaction,
  sequelize,
} = require("../models");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { signToken, verifyToken } = require("../helper/jwt");

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
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
        ],
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
      const { transactionDetail, toAccountNo, amount } = req.body;
      console.log(req.body);

      const account = await Account.findOne({
        where: { CustomerId: req.user.id },
      });
      const AccountId = account.id;
      let currency = "IDR";

      let transactionType;
      let accountUpdate;
      let fromAccountNo;
      if (toAccountNo == account.accountNo) {
        transactionType = "Kredit";
        fromAccountNo = "";

        await Account.update(
          { balance: account.balance + amount },
          { where: { accountNo: toAccountNo } },
          { transaction: t }
        );
      } else {
        transactionType = "Debet";
        fromAccountNo = account.accountNo;

        await Account.update(
          { balance: account.balance - amount },
          { where: { id: account.id } },
          { transaction: t }
        );
      }

      const trans = await Transaction.create(
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

      t.commit();
      res.status(201).json(trans);
    } catch (err) {
      console.log(err);
      t.rollback();
      next(err);
    }
  }

  static async postPayment(req, res, next) {

  }

  static async getReport(req, res, next) {
    try {
      const report = await Transaction.findAll()
      res.status(200).json(report)
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // static async postReport(req, res, next) {}
}

module.exports = Controller;
