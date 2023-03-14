const mockArrSales = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
  {
    productId: 3,
    quantity: 5,
  },
];

const mockArrAllSales = [
  {
    saleId: 1,
    date: "2022-10-13T21:45:29.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2022-10-13T21:45:29.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2022-10-13T21:45:29.000Z",
    productId: 3,
    quantity: 15,
  },
];

module.exports = {
  mockArrSales,
  mockArrAllSales,
};
