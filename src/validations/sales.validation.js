const { productsModel } = require('../models');

const validateQuantities = (items) => {
  const quantities = items.map(({ quantity }) => quantity);
  const hasInvalidQuantities = quantities.some((e) => e <= 0);
  return hasInvalidQuantities
    ? { type: 422, message: '"quantity" must be greater than or equal to 1' }
    : { type: null, message: 'OK' };
};

const validateProductIds = async (products) => {
  const productPromises = Promise.all(
    products.map(async ({ productId }) => {
      const product = await productsModel.getById(productId);
      return product;
    }),
  );
  const validatedProducts = await productPromises;
  return validatedProducts;
};

const validateSales = async (salesData) => {
  try {
    const validationResults = await Promise.all(
      salesData.map(({ productId, quantity }) => {
        if (productId === undefined) {
          return 'Invalid Product ID';
        }
        if (quantity === undefined) {
          return 'Invalid quantity';
        }
        return 'OK';
      }),
    );
    return validationResults;
  } catch (error) {
    console.log(error);
  }
};

const validateSalesData = (data) => (
  data.length === 0
    ? { type: 404, message: 'Sale not found' }
    : { type: null, message: 'OK' }
);

module.exports = {
  validateQuantities,
  validateProductIds,
  validateSales,
  validateSalesData,
};