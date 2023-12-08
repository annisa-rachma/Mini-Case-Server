const { Customer } = require("../models");
const {signToken, verifyToken } = require('../helper/jwt')

const authentication = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token) throw {name : "InvalidToken"}

        const verify = verifyToken(access_token)
        const user = await Customer.findByPk(verify.id)
        if(!user) throw {name : "InvalidToken"}

        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {authentication}