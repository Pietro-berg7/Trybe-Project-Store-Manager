const allSales = [
  {
    saleId: 1,
    date: "2023-02-15T16:19:33.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2023-02-15T16:19:33.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2023-02-15T16:19:33.000Z",
    productId: 3,
    quantity: 15,
  },
];
const createSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 3,
    },
  ],
};
const saleById = [
  {
    date: "2023-02-27T19:24:22.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2023-02-27T19:24:22.000Z",
    productId: 2,
    quantity: 10,
  },
];
module.exports = { allSales, createSale, saleById };
