const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return products;
};

const getById = async (productId) => {
  const [[products]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id;', [productId],
  );
  return products;
};

module.exports = { getAll, getById };