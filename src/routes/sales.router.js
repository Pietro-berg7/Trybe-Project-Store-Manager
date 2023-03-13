const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.getSalesData);
router.get('/:id', salesController.getSaleDetailsById);
router.post('/', salesController.createSales);

module.exports = router;
