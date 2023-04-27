const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const { type, message } = await productService.getAll();
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getById(id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const newProduct = req.body;
  const result = await productService.insertProduct(newProduct);
  return res.status(201).json(result.message);
};

module.exports = { getAll, getById, insertProduct };