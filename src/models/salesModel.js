const connection = require('./connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );
  return insertId;
};

const insertSalesProducts = async (saleId, productId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [saleId, productId, quantity],
  );
  return result;
};

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT allProduct.sale_id AS saleId, date,
      allProduct.product_id AS productId, allProduct.quantity
    FROM StoreManager.sales AS allSales, StoreManager.sales_products AS allProduct
    WHERE allSales.id = allProduct.sale_id
    GROUP BY allProduct.sale_id, allSales.date, allProduct.product_id, allProduct.quantity
    ORDER BY allProduct.sale_id, allProduct.product_id;`, [],
  );

  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id AS productId, quantity
      FROM StoreManager.sales AS allSales, StoreManager.sales_products AS salesProduct
      WHERE id = (?) AND allSales.id = salesProduct.sale_id;`, [id],
  );

  return sale;
};

const deleteSale = async (id) => {
  const [sale] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;', [id],
  );

  return sale;
};

// const updateSale = async (id, sales) => {
//   const [sale] = await connection.execute(
//     'UPDATE StoreManager.sales SET date = NOW() WHERE id = ?;', [id],
//   );
//   await connection.execute(
//     'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;', [id],
//   );
//   await Promise.all(sales
//     .map((product) => connection
//       .execute('INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
//         [id, product.productId, product.quantity])));
//   const objSale = { id, itemsSold: sales };
//   return objSale;
// };

module.exports = { insertSales, insertSalesProducts, getAll, getById, deleteSale }; 