const salesModel = require('../models/salesModel');

const insertSale = async () => {
  const sale = await salesModel.insertSales();
  return { type: null, message: sale };
};

const insertSalesProducts = async (saleId, sales) => {
  await Promise.all(sales
    .map((product) => salesModel
      .insertSalesProducts(saleId, product.productId, product.quantity)));
  const objSale = { id: saleId, itemsSold: sales };
  return { type: 201, message: objSale };
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