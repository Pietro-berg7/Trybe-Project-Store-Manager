const { productsService } = require('../services');

const AllProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();

  if (type) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(message);
};

const ProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(Number(id));

  if (type) {
    return res.status(type).json({ message });
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
  AllProducts,
  ProductById,
  postProduct,
};
