const { salesModel } = require('../models');
const {
  validateQuantities,
  validateProductIds,
  validateSalesData,
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

const allSales = async () => {
  const sales = await salesModel.getSalesData();
  return { type: null, message: sales };
};

const getSaleById = async (id) => {
  const saleDetails = await salesModel.getSaleDetailsById(id);
  const { type, message } = validateSalesData(saleDetails);
  return type
    ? { type, message }
    : { type: 200, message: saleDetails };
};

const deleteSaleData = async (id) => {
  const existingSale = await salesModel.getSaleDetailsById(id);
  return existingSale && existingSale.length !== 0
    ? (await salesModel.deleteById(id), { type: 204 })
    : { type: null, message: 'Sale not found' };
};

module.exports = {
  createSales,
  allSales,
  getSaleById,
  deleteSaleData,
};
