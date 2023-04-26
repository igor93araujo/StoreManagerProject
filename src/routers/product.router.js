const express = require('express');
const productControler = require('../controllers/productControler');

const productRouter = express.Router();
productRouter.get('/', productControler.getAll);
productRouter.get('/:id', productControler.getById);

module.exports = productRouter ;