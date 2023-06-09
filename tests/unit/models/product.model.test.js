const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/productModel')

const { getAllMockWithData, getDataByIdMock } = require('../models/mocks/products.mock');


describe('Question Model tests', () => {
  describe('Sucess case', () => {
    afterEach(() => sinon.restore());

    const INVALID_ID = 100;

    it('GetAll with data', async () => {
      sinon.stub(connection, 'execute').resolves([getAllMockWithData]);

      const result = await productModel.getAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(3);
      expect(result[0]).to.contain.keys(['id', 'name']);
    });

    it('Get data by id', async () => {
      sinon.stub(connection, 'execute').resolves([getDataByIdMock]);
      const result = await productModel.getById(1);
      expect(result).to.contain.keys('id', 'name');
      expect(result).to.be.equal(getDataByIdMock[0]);
    });

/*     it('Tests an unexistent id', async () => {
      sinon.stub(connection, 'execute').resolves(undefined);
      const result = await productModel.getById(INVALID_ID);
      expect(result).to.equal({
        "message": "Product not found"
      });
    }); */
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