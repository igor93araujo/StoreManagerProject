const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productService = require('../../../src/services/productService');
const productModel = require('../../../src/models/productModel');

const { getAllMockWithData, getDataByIdMock } = require('../models/mocks/products.mock');

describe('Product Service tests', () => {
  describe('Sucess case', () => {
    afterEach(() => sinon.restore());

    it('GetAll with data', async () => {
      sinon.stub(productModel, 'getAll').resolves([ getAllMockWithData ]);

      const result = await productService.getAll();

      expect(result.message).to.be.an('array');
      expect(result.message).to.have.length(1);
    });

    it('GetAll without data', async () => {
      sinon.stub(productModel, 'getAll').resolves([]);

      const result = await productService.getAll();

      expect(result.message).to.be.an('array');
      expect(result.message).to.have.length(0);
    });

    it('Get data by id', async () => {
      sinon.stub(productModel, 'getById').resolves([getDataByIdMock]);
      const result = await productService.getById(1);
      const finalResult = result.message[0][0];
      expect(finalResult).to.contain.keys(['id', 'name']);
      expect(finalResult).to.be.equal(getDataByIdMock[0]);
    });

    it('Tests an unexistent id', async () => {
      sinon.stub(productModel, 'getById').resolves('Product not found');
      const result = await productService.getById(1);
      const finalResult = result.message;
      expect(finalResult).to.be.equal('Product not found');
    });
  });

  describe('Fail case', () => {
    afterEach(() => sinon.restore());
    it('GetAll db fail', async () => {
      sinon.stub(connection, 'execute').throws(new Error('Fake error'));

      try {
        await productModel.getAll();
        expect.fail();
      } catch (error) {
        expect(error.message).to.be.equal('Fake error');
      }
    });
  });
});