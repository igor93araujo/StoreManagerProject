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

const insertProduct = async ({ name }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [name],
  );

  return { id: insertId, name };
};

const updateProduct = async (id, name) => {
  const [updatedProduct] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [name, id],
  );
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const deletedProduct = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return deletedProduct;
};

module.exports = { getAll, getById, insertProduct, updateProduct, deleteProduct }; 