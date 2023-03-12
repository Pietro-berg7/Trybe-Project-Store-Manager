const express = require('express');
const { productsController } = require('../controllers');
const validate = require('../middlewares/nameValidate.middleware');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', validate, productsController.postProduct);

module.exports = router;
