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

const createProduct = async (product) => {
  const error = productValidate(product);
  if (error.type) {
    return error;
  }
  const insertedProductId = await productsModel.postProduct(product);
  const insertedProduct = await productsModel.getById(insertedProductId);
  return { type: null, message: insertedProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};