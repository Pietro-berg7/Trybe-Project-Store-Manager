const { productsModel } = require('../models');
const { validation } = require('../validations/validation');

const getAllProducts = async () => {
  const products = await productsModel.getAll();
  return { type: 200, message: products };
};

const getProductById = async (req) => {
  const { id } = req.params;
  const idValidation = validation(id);
  if (idValidation.type) {
    return { status: 400, response: { message: idValidation.message } };
  }
  const products = await productsModel.getById(id);
  if (!products) return { status: 404, response: { message: 'Product not found' } };
  return { type: 200, message: products };
};

module.exports = {
  getAllProducts,
  getProductById,
};