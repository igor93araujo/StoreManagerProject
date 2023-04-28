const salesService = require('../services/salesService');

const insertSales = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.insertSale();
  if (type) return res.status(type).json({ message });
  return res.status(201).json({
    id: message,
    itemSold: sales,
  });
};

const insertSalesProducts = async () => {

}

const getAll = async (req, res) => {
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


module.exports = { insertSales, insertSalesProducts, getAll, getById };