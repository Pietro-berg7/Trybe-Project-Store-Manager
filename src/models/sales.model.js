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

const getSalesData = async () => {
  const [request] = await conn.execute(
    `SELECT
      (products.sale_id) AS saleId,
      (sales.date) AS date,
      (products.product_id) AS productId,
      (products.quantity) AS quantity
    FROM 
      StoreManager.sales_products AS products
    JOIN StoreManager.sales AS sales ON sales.id = products.sale_id
    ORDER BY products.sale_id ASC, products.product_id ASC;`,
  );

  return request;
};

const getSaleDetailsById = async (id) => {
  const [request] = await conn.execute(
    `SELECT
      (sales.date) AS date,
      (products.product_id) AS productId,
      (products.quantity) AS quantity
    FROM StoreManager.sales_products AS products
    JOIN StoreManager.sales AS sales ON sales.id = products.sale_id
    WHERE products.sale_id = ?`,
    [id],
  );
  return request;
};

const deleteById = async (id) => {
  const [request] = await conn.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return request;
};

module.exports = {
  createSale,
  addProductToSale,
  getSalesData,
  getSaleDetailsById,
  deleteById,
};
