const salesModel = require('../models/salesModel');

const insertSale = async () => {
  const sale = await salesModel.insertSales();
  return { type: null, message: sale };
};

const insertSalesProducts = async () => {
  const newSaleProduct = await salesModel.insertSalesProducts();
  return { type: null, message: newSaleProduct };
};

const getAll = async () => {
  const allSales = await salesModel.getAll();
  return { type: null, message: allSales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (sale.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: sale };
};

module.exports = { insertSale, insertSalesProducts, getAll, getById };