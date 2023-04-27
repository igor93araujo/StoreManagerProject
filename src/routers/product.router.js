const express = require('express');
const productControler = require('../controllers/productControler');
const productsValidated = require('../middlewares/productsValidated');

const productRouter = express.Router();
productRouter.get('/', productControler.getAll);
productRouter.get('/:id', productControler.getById);
productRouter.post('/', productsValidated, productControler.insertProduct);

module.exports = productRouter;