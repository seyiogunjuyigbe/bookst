const router = require("express").Router();
const transactionCtrl = require('../controllers/transaction');
const { checkIfMerchant } = require("../middlewares/auth")
router.get('/:transactionId/complete', transactionCtrl.fetchAfterPurchase)
router.get("/", checkIfMerchant, transactionCtrl.fetchAllTransactions)
module.exports = router;