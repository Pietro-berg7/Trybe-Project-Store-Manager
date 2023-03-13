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

module.exports = {
  createSales,
};
