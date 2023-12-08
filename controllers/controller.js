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
      const user = await Account.findOne({
        where : {CustomerId: req.user.id},
        include: [
          {
            model: Customer,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
        ],
      })

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postTransaction(req, res, next) {
    try {
      
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getReport(req, res, next) {}

  static async postReport(req, res, next) {}
}

module.exports = Controller;
