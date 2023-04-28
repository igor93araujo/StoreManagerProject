const express = require('express');
const salesControler = require('../controllers/salesControler');

const salesRouter = express.Router();
salesRouter.post('/', salesControler.insertSales);
salesRouter.get('/', salesControler.getAll);
salesRouter.get('/:id', salesControler.getById);

module.exports = salesRouter;