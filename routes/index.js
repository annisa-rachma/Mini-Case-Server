const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const { authentication } = require('../middlewares/authentication')

router.post('/login', Controller.loginAccount)

router.use(authentication)

router.get('/account', Controller.getAccountDetail)
router.post('/transaction/transfer', Controller.postTransaction)
router.post('/transaction/payment', Controller.postPayment)
router.get('/report', Controller.getReport)

module.exports = router