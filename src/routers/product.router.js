const express = require('express');
const productControler = require('../controllers/productControler');

const productRouter = express.Router();
productRouter.get('/', productControler.getAll);
productRouter.get('/:id', productControler.getById);
productRouter.post('/', productControler.insertProduct);
productRouter.put('/:id', productControler.updateProduct);

module.exports = productRouter;