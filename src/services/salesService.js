const salesModel = require('../models/salesModel');

const insertSale = async () => {
  const insertSale = await salesModel.insertSales();
  return { type: null, message: insertSale };
};

const insertSalesProducts = async () => {
  const insertSalesProducts = await salesModel.insertSalesProducts();
  return { type: null, message: insertSalesProducts };
}

const getAll = async () => {
  const getAll = await salesModel.getAll();
  return { type: null, message: getAll };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale) return { type: 404, message: 'Sale not found' };
  return { type: null, message: sale };
};

module.exports = { insertSale, insertSalesProducts, getAll, getById };