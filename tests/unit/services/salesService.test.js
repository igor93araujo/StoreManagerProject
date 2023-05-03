const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');

const { getAllMockWithData, getDataByIdMock } = require('../models/mocks/sales.mock');

describe('Sale Service tests', () => {
  describe('Sucess case', () => {
    afterEach(() => sinon.restore());

    it('GetAll with data', async () => {
      sinon.stub(salesModel, 'getAll').resolves([ getAllMockWithData ]);

      const result = await salesService.getAll();

      expect(result.message).to.be.an('array');
      expect(result.message).to.have.length(1);
    });

    it('GetAll without data', async () => {
      sinon.stub(salesModel, 'getAll').resolves([]);

      const result = await salesService.getAll();

      expect(result.message).to.be.an('array');
      expect(result.message).to.have.length(0);
    });

    it('Get data by id', async () => {
      sinon.stub(salesModel, 'getById').resolves([getDataByIdMock]);
      const result = await salesService.getById(1);
      const finalResult = result.message[0][0];
      expect(finalResult).to.contain.keys(['id', 'name']);
      expect(finalResult).to.be.equal(getDataByIdMock[0]);
    });
    it('Get data by invalid id', async () => {
      sinon.stub(salesModel, 'getById').resolves([]);
      const result = await salesService.getById(100);
      expect(result.message).to.be.equal('Sale not found');
    });

    it('Delete data by id', async () => {
      sinon.stub(salesModel, 'deleteSale').resolves([]);
      const result = await salesService.deleteSale(1);
      expect(result.message).to.be.equal('Sale not found');
    });

    it('Delete data by invalid id', async () => {
      sinon.stub(salesModel, 'deleteSale').resolves([]);
      const result = await salesService.deleteSale(100);
      expect(result.message).to.be.equal('Sale not found');
    });
          
  });

  describe('Fail case', () => {
    afterEach(() => sinon.restore());
    it('GetAll db fail', async () => {
      sinon.stub(connection, 'execute').throws(new Error('Fake error'));

      try {
        await salesModel.getAll();
        expect.fail();
      } catch (error) {
        expect(error.message).to.be.equal('Fake error');
      }
    });
  });
});