const express = require('express');
const salesControler = require('../controllers/salesControler');

const {
  validateProductIdSales,
  validateQuantitySales,
  validateProductIdSalesExist,
} = require('../middlewares/salesValidator');

const salesRouter = express.Router();
salesRouter.post('/',
  validateProductIdSales,
  validateQuantitySales,
  validateProductIdSalesExist,
  salesControler.insertSales);
salesRouter.get('/', salesControler.getAll);
salesRouter.get('/:id', salesControler.getById);
salesRouter.delete('/:id', salesControler.deleteSale);
// salesRouter.put('/:id', salesControler.updateSale);

module.exports = salesRouter;