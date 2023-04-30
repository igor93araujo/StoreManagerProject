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
  if (!newProduct.name || newProduct.name === undefined) {
    console.log('insert service');
 return {
    type: 400, message: '"name" is required',
  }; 
}
  if (newProduct.name && newProduct.name.length < 5) {
    return {
      type: 422, message: '"name" length must be at least 5 characters long',
    };
  }
  const createdProduct = await productModel.insertProduct(newProduct);
  return { type: null, message: createdProduct };
};

const validateProduct = async (productName) => {
  const trimmedName = productName ? productName.trim() : '';
  if (!trimmedName) {
    return { type: 400, message: { message: '"name" is required' } };
  }
  if (trimmedName.length < 5) {
    return { type: 422, message: { message: '"name" length must be at least 5 characters long' } };
  }
};

const updateProduct = async (id, productName) => {
  const validationResult = await validateProduct(productName);
  if (validationResult) {
    return validationResult;
  }

  const products = await productModel.updateProduct(id, productName);
  if (products.changedRows === 0) {
    return { type: 404, message: { message: 'Product not found' } };
  }

  return { type: 200, message: { id, name: productName } };
};

const deleteProduct = async (id) => {
  const [products] = await productModel.deleteProduct(id);
  if (products.affectedRows === 0) {
    return { type: 404, message: { message: 'Product not found' } };
  }

  return { type: 204, message: '' };
};

module.exports = { getAll, getById, insertProduct, updateProduct, deleteProduct };