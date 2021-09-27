var express = require('express');
var router = express.Router();
var transactionController = require('../controllers/TransactionController');

/* GET home page. */
router.get('/', transactionController.listDesc);
router.post('/', transactionController.create);
router.get('/in', transactionController.listIncome);
router.get('/out', transactionController.listOutcome);
router.get('/trans', transactionController.byCategory);
router.delete('/:id', transactionController.destroy);
router.put('/:id', transactionController.update);

module.exports = router;
