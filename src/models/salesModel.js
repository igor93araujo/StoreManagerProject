const connection = require('./connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  return insertId;
};

const insertSalesProducts = async (saleId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return insertId;
};

const getAll = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM StoreManager.sales;',
  );

  return sales;
};

const getById = async (id) => {
  const [[sale]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?;',
    [id],
  );

  return sale;
};


module.exports = { insertSales, insertSalesProducts, getAll, getById }; 