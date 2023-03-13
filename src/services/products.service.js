const { productsModel } = require('../models');
const { idValidate, productValidate } = require('../validations/products.validation');

const getAllProducts = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const error = idValidate(id);
  if (error.type) {
    return error;
  }

  const product = await productsModel.getById(id);

  if (product) {
    return { type: null, message: product };
  }

  return { type: 404, message: 'Product not found' };
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