const { salesService } = require('../services');
const { validateSales } = require('../validations/sales.validation');

const createSales = async (req, res) => {
  const salesData = req.body;
  const salesValidationResult = await validateSales(salesData);

  if (salesValidationResult.every((status) => status === 'OK')) {
    const { type, message } = await salesService.createSales(salesData);
    return type
      ? res.status(type).json({ message })
      : res.status(201).json(message);
  }

  if (salesValidationResult.includes('Invalid Product ID')) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  return res.status(400).json({ message: '"quantity" is required' });
};

const getSalesData = async (_req, res) => {
  const { message } = await salesService.allSales();
  return res.status(200).json(message);
};

const getSaleDetailsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);
  return type === 404
    ? res.status(type).json({ message })
    : res.status(type).json(message);
};

const deleteSaleData = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSaleData(id);
  return type === null
    ? res.status(404).json({ message })
    : res.status(204).send(message);
};

module.exports = {
  createSales,
  getSalesData,
  getSaleDetailsById,
  deleteSaleData,
};
