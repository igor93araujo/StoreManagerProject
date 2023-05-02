const salesService = require('../services/salesService');

const insertSales = async (req, res) => {
  const sales = req.body;
  const id = await salesService.insertSale();
    
  const { type, message } = await salesService.insertSalesProducts(id.message, sales);
  return res.status(type).json(message);
};

const getAll = async (_req, res) => {
  const { type, message } = await salesService.getAll();
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(200).json(message);
};

module.exports = { insertSales, getAll, getById };