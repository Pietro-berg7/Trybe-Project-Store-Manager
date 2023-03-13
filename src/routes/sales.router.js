const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.post('/', salesController.createSales);

module.exports = router;
