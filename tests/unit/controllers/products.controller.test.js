const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const sinonChai = require("sinon-chai");
const app = require("../../../src/app");

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const {
  mockGetAllProducts,
  mockGetOneProduct,
} = require("../mocks/products.mock");

const { productsService } = require("../../../src/services");
const { getBySearch } = require("../../../src/controllers/products.controller");

describe("Unit Test - productsController", () => {
  afterEach(sinon.restore);

  describe("AllProducts", function () {
    it("Should return all products", async function () {
      sinon
        .stub(productsService, "getAllProducts")
        .resolves({ type: false, message: mockGetAllProducts });

      const res = await chai.request(app).get("/products");

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.deep.equal(mockGetAllProducts);
    });
  });

  describe("ProductById", function () {
    it("Should return a product by its ID", async function () {
      sinon
        .stub(productsService, "getProductById")
        .resolves({ type: false, message: mockGetOneProduct });

      const res = await chai.request(app).get("/products/1");

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.deep.equal(mockGetOneProduct);
    });

    it("Should return an error message if it does not find a product by ID", async function () {
      sinon
        .stub(productsService, "getProductById")
        .resolves({ type: 404, message: "Product not found" });

      const res = await chai.request(app).get("/products/99");

      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal("Product not found");
    });
  });

  describe("updateProduct", () => {
    it("Should return an error message if the product already exists", async function () {
      sinon
        .stub(productsService, "createProduct")
        .resolves({ type: 409, message: "Product already exists" });

      const res = await chai
        .request(app)
        .post("/products")
        .send({ name: "Product Test" });

      expect(res.status).to.be.equal(409);
      expect(res.body.message).to.be.equal("Product already exists");
    });
  });

  describe("deleteProduct", () => {
    it("It should delete a product by ID", async function () {
      const id = 1;
      sinon
        .stub(productsService, "deleteProduct")
        .resolves({ type: false, message: "Product deleted successfully" });

      const res = await chai.request(app).delete(`/products/${id}`);

      expect(res.status).to.be.equal(204);
      expect(res.body).to.be.empty;
    });

    it("Should return an error message if it fails to find a product by ID to delete", async function () {
      const id = 99;
      sinon
        .stub(productsService, "deleteProduct")
        .resolves({ type: 404, message: "Product not found" });

      const res = await chai.request(app).delete(`/products/${id}`);

      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal("Product not found");
    });
  });

  describe("getBySearch", () => {
    it("Should return all products that match the search term", async () => {
      const res = {};
      const req = {
        query: "Nome",
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "getBySearch").resolves({
        status: 200,
        response: [
          { id: 1, name: "Nome 2" },
          { id: 2, name: "Nome 1" },
        ],
      });

      await getBySearch(req, res);
    });
  });
});
