const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const {
  mockGetAllProducts,
  mockGetOneProduct,
} = require("../mocks/products.mock");

const { productsModel } = require("../../../src/models");
const {
  getAllProducts,
  getProductById,
  deleteProduct,
  getBySearch,
} = require("../../../src/services/products.service");

describe("Unit Test - productsServices", () => {
  describe("getAllProducts", () => {
    it("should return complete array", async () => {
      sinon.stub(productsModel, "getAll").resolves(mockGetAllProducts);

      await getAllProducts();
    });
  });

  describe("getProductById", () => {
    it("should return object with one product", async () => {
      const req = {
        params: { id: 1 },
      };

      sinon.stub(productsModel, "getById").resolves(mockGetOneProduct);

      await getProductById(req);
    });

    it("should return nothing", async () => {
      const req = {
        params: { id: 99999 },
      };

      sinon.stub(productsModel, "getById").resolves(undefined);

      await getProductById(req);
    });
  });

  describe("deleteProduct", () => {
    it("should delete product successfully", async () => {
      sinon
        .stub(productsModel, "getById")
        .resolves({ id: 1, name: "Current name" });
      sinon.stub(productsModel, "deleteById").resolves({ affectedRows: 1 });

      await deleteProduct({ params: { id: 1 } });
    });

    it("should return error when product doesn't exist", async () => {
      sinon.stub(productsModel, "getById").resolves(undefined);
      sinon.stub(productsModel, "deleteById").resolves({ affectedRows: 1 });

      await deleteProduct({ params: { id: 1 } });
    });
  });

  describe("getBySearch", () => {
    it("should return all products when search term is empty", async () => {
      sinon.stub(productsModel, "getAll").resolves([
        { id: 1, name: "Nome 2" },
        { id: 2, name: "Nome 1" },
      ]);
      await getBySearch("");
    });
  });

  afterEach(sinon.restore);
});
