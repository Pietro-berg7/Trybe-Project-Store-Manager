const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const { mockArrSales, mockArrAllSales } = require("../mocks/sales.mock");

const connection = require("../../../src/models/conn");
const {
  createSale,
  getSalesData,
  getSaleDetailsById,
  deleteById,
  addProductToSale,
} = require("../../../src/models/sales.model");

describe("Unit Test - salesModels", () => {
  describe("Create sale", () => {
    it("should return an object with one product", async () => {
      sinon.stub(connection, "execute").resolves([{ insertId: 10 }]);
      await createSale(mockArrSales);
    });
  });

  describe("Get all sales", () => {
    it("should return an array with all sales data", async () => {
      sinon.stub(connection, "execute").resolves(mockArrAllSales);
      await getSalesData();
    });
  });

  describe("Get sale details by ID", () => {
    it("should return an array with sale details", async () => {
      const res = [
        { date: "2022-10-17T19:12:53.000Z", productId: 3, quantity: 15 },
      ];
      sinon.stub(connection, "execute").resolves(res);
      await getSaleDetailsById(1);
    });
  });

  describe("Delete sale by ID", () => {
    it("should return an empty object", async () => {
      sinon.stub(connection, "execute").resolves([{}]);
      await deleteById(1);
    });
  });

  describe("Add product to sale", () => {
    it("should add a product to a sale and return undefined", async () => {
      sinon.stub(connection, "execute").resolves();
      await addProductToSale([{ productId: 1, quantity: 4 }], 1);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
