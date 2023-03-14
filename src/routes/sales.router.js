const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.getSalesData);
router.get('/:id', salesController.getSaleDetailsById);
router.post('/', salesController.createSales);
router.delete('/:id', salesController.deleteSaleData);

module.exports = router;
