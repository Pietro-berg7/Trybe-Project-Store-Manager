const conn = require('./conn');

const getAll = async () => {
  const [rows] = await conn.execute(
    'SELECT * FROM StoreManager.products',
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
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

module.exports = {
  getAll,
  getById,
  postProduct,
};