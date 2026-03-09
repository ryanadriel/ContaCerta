const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.index);
router.get('/:id', profileController.show);
router.post('/', profileController.store);
router.put('/:id', profileController.update);
router.delete('/:id', profileController.delete);

module.exports = router;