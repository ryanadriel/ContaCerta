const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.index);
router.get('/:id', transactionController.show);
router.post('/', transactionController.store);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

module.exports = router;