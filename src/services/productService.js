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

const insertProduct = async (newProduct) => {
  if (!newProduct.name || newProduct.name === undefined) return {
    type: 400, message: '"name" is required'
  };
  if (newProduct.name && newProduct.name.length < 5) {
    return {
      type: 422, message: '"name" length must be at least 5 characters long',
    };
  }
  const createdProduct = await productModel.insertProduct(newProduct);
  return { type: null, message: createdProduct };
};

module.exports = { getAll, getById, insertProduct };