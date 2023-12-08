const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const { authentication } = require('../middlewares/authentication')

router.post('/login', Controller.loginAccount)

router.use(authentication)

router.get('/account', Controller.getAccountDetail)
router.post('/transaction', Controller.postTransaction)
router.get('/report', Controller.getReport)
router.post('/report', Controller.postReport)

module.exports = router