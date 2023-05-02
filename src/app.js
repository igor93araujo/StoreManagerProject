const express = require('express');
const productRouter = require('./routers/product.router');
const salesRouter = require('./routers/sales.router');

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/', (_req, res) => res.status(200).json());
app.use('/products', productRouter);
app.use('/sales', salesRouter);

module.exports = app;