const express = require('express');
const productControler = require('../controllers/productControler');

const productRouter = express.Router();
productRouter.get('/', productControler.getAll);
productRouter.get('/:id', productControler.getById);
productRouter.post('/', productControler.insertProduct);
productRouter.put('/:id', productControler.updateProduct);
productRouter.delete('/:id', productControler.deleteProduct);

module.exports = productRouter;