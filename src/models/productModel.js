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

const insertProduct = async (newProduct) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [newProduct],
  );

  return { id: insertId, name: newProduct.name };
};

module.exports = { getAll, getById, insertProduct }; 