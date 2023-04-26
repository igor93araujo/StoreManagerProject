const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();
  return { type: null, message: products }
};

const getById = async (product_id) => {
  const products = await productModel.getById(product_id);
 
  if (!products) return { type: 404, message: 'Product not found' };

  return { type: null, message: products }
};

module.exports = { getAll, getById };