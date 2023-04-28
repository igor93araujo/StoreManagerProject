const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');

const { getAllMockWithData, getDataByIdMock } = require('./mocks/sales.mock');


describe('Sales Model tests', () => {
  describe('Sucess case', () => {
    afterEach(() => sinon.restore());

    const INVALID_ID = 100;

    it('GetAll with data', async () => {
      sinon.stub(connection, 'execute').resolves([getAllMockWithData]);

      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(2);
      expect(result[0]).to.contain.keys(['id', 'date']);
    });

    it('Get data by id', async () => {
      sinon.stub(connection, 'execute').resolves([getDataByIdMock]);
      const [result] = await salesModel.getById(2);
      expect(result).to.contain.keys('id', 'name');
      expect(result).to.be.equal(getDataByIdMock[0]);
    });

/*     it('Tests an unexistent id', async () => {
      sinon.stub(connection, 'execute').resolves(undefined);
      const result = await salesModel.getById(INVALID_ID);
      expect(result).to.equal({
        "message": "Sale not found"
      });
    }); */
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