const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const {
  mockGetAllProducts,
  mockGetOneProduct,
} = require("../mocks/products.mock");

const connection = require("../../../src/models/conn");
const {
  getAll,
  getById,
  postProduct,
  deleteById,
  getBySearch,
} = require("../../../src/models/products.model");

describe("Unit Test - productsModels", () => {
  describe("Get all products", () => {
    it("should return a complete array", async () => {
      sinon.stub(connection, "execute").resolves(mockGetAllProducts);

      await getAll();
    });
  });

  describe("Get one product", () => {
    it("should return an object with one product", async () => {
      sinon.stub(connection, "execute").resolves([[mockGetOneProduct]]);

      await getById(1);
    });
  });

  describe("postProduct", () => {
    it("should return 1", async () => {
      sinon.stub(connection, "execute").resolves([1]);

      await postProduct({ name: "Product X" });
    });
  });

  describe("deleteById", () => {
    it("should return an empty object", async () => {
      sinon.stub(connection, "execute").resolves([{}]);

      await deleteById(1);
    });

    it("should return undefined", async () => {
      sinon.stub(connection, "execute").resolves([undefined]);

      await deleteById(1);
    });
  });

  describe("getBySearch", () => {
    it("should return an array with two objects", async () => {
      sinon.stub(connection, "execute").resolves([[{}, {}]]);

      await getBySearch("Nome");
    });
  });

  afterEach(sinon.restore);
});
