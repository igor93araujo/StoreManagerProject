const salesService = require('../services/salesService');

const insertSales = async (req, res) => {
  const sales = req.body;
  const salesServiceObj = await salesService.insertSale();    
  const { type, message } = await salesService.insertSalesProducts(salesServiceObj.message, sales);
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

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(204).json();
};

// const updateSale = async (req, res) => {
//   const { id } = req.params;
//   const sales = req.body;
//   const { type, message } = await salesService.updateSale(id, sales);
//   if (type) {
//     return res.status(type).json({ message });
//   }
//   return res.status(200).json(message);
// };

module.exports = { insertSales, getAll, getById, deleteSale };