const conn = require('./conn');

const getAll = async () => {
  const [rows] = await conn.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return rows[0];
};

const postProduct = async (product) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [product],
  );
  return insertId;
};

const updateProducts = async (name, id) => {
  const updateQuery = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';
  const selectQuery = 'SELECT * FROM StoreManager.products WHERE id = ?;';

  await conn.execute(updateQuery, [name, id]);

  const [rows] = await conn.execute(selectQuery, [id]);

  return rows.length ? rows[0] : null;
};

const deleteById = async (id) => {
  const [deleteResult] = await conn.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return deleteResult;
};

const getBySearch = async (searh) => {
  const [searchResult] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?',
    [`%${searh}%`],
  );
  return searchResult;
};

module.exports = {
  getAll,
  getById,
  postProduct,
  updateProducts,
  deleteById,
  getBySearch,
};
