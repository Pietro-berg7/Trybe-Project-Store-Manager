const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const {
  mockArrSales,
  mockArrAllSales,
  mockArrOneSale,
} = require("../mocks/sales.mock");

const { salesService } = require("../../../src/services");
const {
  createSales,
  getSalesData,
  getSaleDetailsById,
  deleteSaleData,
} = require("../../../src/controllers/sales.controller");

describe("Unit Test - salesController", () => {
  describe("createSales", () => {
    it("should respond with status 201 and the new sale object", async () => {
      const res = {};
      const req = { body: { itemsSold: [...mockArrSales] } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "createSales").resolves({
        type: 201,
        message: { id: 1, itemsSold: req.body.itemsSold },
      });

      await createSales(req, res);
    });
  });

  describe("getSalesData", () => {
    it("should respond with status 200 and an array of all sales", async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "allSales")
        .resolves({ type: 200, message: mockArrAllSales });

      await getSalesData(req, res);
    });
  });

  describe("getSaleDetailsById", () => {
    it("should respond with status 200 and a single sale object", async () => {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "getSaleById")
        .resolves({ type: 200, message: mockArrOneSale });

      await getSaleDetailsById(req, res);
    });
  });

  describe("deleteSaleData", () => {
    it("should respond with status 204", async () => {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "deleteSaleData").resolves({ type: 204 });

      await deleteSaleData(req, res);
    });
  });
});
