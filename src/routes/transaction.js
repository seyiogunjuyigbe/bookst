const router = require("express").Router();
const transactionCtrl = require('../controllers/transaction');
router.get('/:transactionId', transactionCtrl.fetchAfterPurchase)
module.exports = router;