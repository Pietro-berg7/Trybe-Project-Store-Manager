const express = require('express');
const { productsController } = require('../controllers');
const validateName = require('../middlewares/nameValidate.middleware');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', validateName, productsController.postProduct);

module.exports = router;
