const conn = require('./conn');

const createSale = async () => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales () VALUES();',
    [],
  );
  return insertId;
};

const addProductToSale = async (saleId, { productId, quantity }) => {
  await conn.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ?);`,
    [saleId, productId, quantity],
  );
};

module.exports = {
  createSale,
  addProductToSale,
};
