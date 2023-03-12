const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();
  if (type === 'error') {
    return res.status(404).json({ error: message });
  }
  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(Number(id));
  if (type === 'error') {
    return res.status(404).json({ error: message });
  }
  return res.status(200).json(message);
};

const postProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(201).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
};
