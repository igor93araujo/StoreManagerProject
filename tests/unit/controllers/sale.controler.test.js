const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const salesControler = require('../../../src/controllers/salesControler');
const salesService = require('../../../src/services/salesService');
const { getAllMockWithData, getDataByIdMock } = require('../models/mocks/sales.mock');

describe('Sales Controller Test', () => {
  describe('Sucess Case', () => {
    afterEach(() => sinon.restore());

    it('getAll', async () => {
      sinon.stub(salesService, 'getAll').resolves({
        type: null,
        message: [getAllMockWithData],
      });
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesControler.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([getAllMockWithData]);
    });

    it('getById', async () => {
      sinon.stub(salesService, 'getById').resolves({
        type: null,
        message: [getDataByIdMock],
      });
      const req = {
        params: {
          id: 1,
        }
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesControler.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([getDataByIdMock]);
    });

    it('deleteSale', async () => {
      sinon.stub(salesService, 'deleteSale').resolves({});
      const req = {
        params: {
          id: 1,
        }
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesControler.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });
  });
});