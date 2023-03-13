const express = require('express');
const { productsController } = require('../controllers');
const validateName = require('../middlewares/nameValidate.middleware');

const router = express.Router();

router.get('/', productsController.AllProducts);
router.get('/:id', productsController.ProductById);
router.post('/', validateName, productsController.postProduct);
router.put('/:id', validateName, productsController.updateProduct);

module.exports = router;
