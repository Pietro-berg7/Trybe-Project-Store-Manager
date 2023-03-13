const { salesModel } = require('../models');
const {
  validateQuantities,
  validateProductIds,
} = require('../validations/sales.validation');

const createSales = async (products) => {
  const { type, message } = validateQuantities(products);
  if (type) return { type: 422, message };

  const validProductIds = await validateProductIds(products);
  if (validProductIds.includes(undefined)) return { type: 404, message: 'Product not found' };

  const saleId = await salesModel.createSale();
  await Promise.all(
    products.map(async (product) =>
      salesModel.addProductToSale(saleId, product)),
  );

  const result = {
    id: saleId,
    itemsSold: products,
  };
  return { type: null, message: result };
};

module.exports = {
  createSales,
};
