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

const updateProduct = async (name, id) => {
  const error = productValidate(name);
  if (error.type) {
    return error;
  }
  const updatedProductData = await productsModel.updateProducts(name, id);
  return updatedProductData
    ? { type: null, message: updatedProductData }
    : { type: 404, message: 'Product not found' };
};

const deleteProduct = async (id) => {
  const existingProduct = await productsModel.getById(id);
  return existingProduct
    ? (await productsModel.deleteById(id), { type: null })
    : { type: 404, message: 'Product not found' };
};

const getBySearch = async (search) => ({
  message: await productsModel.getBySearch(search),
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getBySearch,
};