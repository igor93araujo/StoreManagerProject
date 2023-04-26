const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();
  return { type: null, message: products };
};

const getById = async (productId) => {
  const products = await productModel.getById(productId);
 
  if (!products) return { type: 404, message: 'Product not found' };

  return { type: null, message: products };
};

module.exports = { getAll, getById };