const { productsService } = require('../services');

const AllProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();

  return type
    ? res.status(404).json({ message: 'Product not found' })
    : res.status(200).json(message);
};

const ProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(Number(id));

  return type
    ? res.status(type).json({ message })
    : res.status(200).json(message);
};

const postProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);

  return type
    ? res.status(type).json({ message })
    : res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateProduct(name, id);

  return type
    ? res.status(type).json({ message })
    : res.json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);
  return type
    ? res.status(404).json({ message: 'Product not found' })
    : res.status(204).json(message);
};

const getBySearch = async (req, res) => {
  const { q } = req.query;
  const { message } = await productsService.getBySearch(q);
  return res.json(message);
};

module.exports = {
  AllProducts,
  ProductById,
  postProduct,
  updateProduct,
  deleteProduct,
  getBySearch,
};
