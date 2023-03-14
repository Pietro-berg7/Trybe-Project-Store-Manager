const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const {
  mockArrSales,
  mockArrAllSales,
  mockArrOneSale,
} = require("../mocks/sales.mock");

const { salesModel } = require("../../../src/models");
const {
  createSales,
  allSales,
  getSaleById,
  deleteSaleData,
} = require("../../../src/services/sales.service");

describe("Unit Test - salesServices", () => {
  describe("allSales", () => {
    it("should return all sales data with status 200", async () => {
      sinon.stub(salesModel, "getSalesData").resolves(mockArrAllSales);

      await allSales();
    });
  });

  describe("getSaleById", () => {
    afterEach(() => {
      sinon.restore(); // Restaura as funções espionadas após cada teste
    });

    it("should return the sale with the specified ID with status 200", async () => {
      const req = {
        params: { id: 1 },
      };
      sinon.stub(salesModel, "getSaleDetailsById").resolves(mockArrOneSale);

      await getSaleById(req);
    });

    it("should return a message 'Sale not found' with status 404 if the sale with the specified ID was not found", async () => {
      const req = {
        params: { id: 99999 },
      };
      sinon.stub(salesModel, "getSaleDetailsById").resolves([]);

      await getSaleById(req);
    });
  });

  describe("deleteSaleData", () => {
    afterEach(() => {
      sinon.restore(); // Restaura as funções espionadas após cada teste
    });

    it("should delete the sale with the specified ID and return status 200 if the sale was found", async () => {
      sinon
        .stub(salesModel, "getSaleDetailsById")
        .resolves({ id: 1, date: "2022-10-17T19:12:53.000Z" });
      sinon.stub(salesModel, "deleteById").resolves(null);

      await deleteSaleData({ params: { id: 1 } });
    });

    it("should return status 200 even if the sale with the specified ID was not found", async () => {
      sinon.stub(salesModel, "getSaleDetailsById").resolves(undefined);
      sinon.stub(salesModel, "deleteById").resolves(null);

      await deleteSaleData({ params: { id: 1 } });
    });
  });

  describe("createSales", () => {
    it("should add the products to the sale and return status 200", async () => {
      sinon.stub(salesModel, "addProductToSale").resolves(1);

      await createSales(mockArrSales);
    });
  });
});
