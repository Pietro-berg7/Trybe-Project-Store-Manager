const { productsModel } = require('../models');
const { idValidate, productValidate } = require('../validations/validation');

const getAllProducts = async () => {
  const products = await productsModel.getAll();
  return { type: 200, message: products };
};

const getProductById = async (req) => {
  const { id } = req.params;
  const idValidation = idValidate(id);
  if (idValidation.type) {
    return { status: 400, response: { message: idValidation.message } };
  }
  const products = await productsModel.getById(id);
  if (!products) return { status: 404, response: { message: 'Product not found' } };
  return { type: 200, message: products };
};

const createProduct = async (productData) => {
  const productValidationError = productValidate(productData);
  if (productValidationError.type) {
    return productValidationError;
  }
  const insertedProductId = await productsModel.createProduct(productData);
  const insertedProduct = await productsModel.getProductById(insertedProductId);
  return { type: null, message: insertedProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};