const productModel = require('../models/productModel');

const validateProductIdSales = (req, res, next) => {
  const JSON = req.body;
  const productId = JSON.map((e) => e.productId);
  if (productId.some((e) => e === undefined)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const validateQuantitySales = (req, res, next) => {
  const JSON = req.body;
  const quantity = JSON.map((e) => e.quantity);

  if (quantity.some((e) => e === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (quantity.some((e) => e <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const validateProductIdSalesExist = async (req, res, next) => {
  const JSON = req.body;
  const allProducts = await Promise.all(JSON.map((e) => productModel.getById(e.productId)));
  const hasntProducts = allProducts.some((product) => product === undefined);
  console.log(hasntProducts);
  if (hasntProducts) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validateProductIdSales,
  validateQuantitySales,
  validateProductIdSalesExist,
};