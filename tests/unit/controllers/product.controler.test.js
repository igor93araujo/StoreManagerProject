const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const productControler = require('../../../src/controllers/productControler');
const productService = require('../../../src/services/productService');
const { getAllMockWithData, getDataByIdMock } = require('../models/mocks/products.mock');

describe('Question Controller Test', () => {
  describe('Sucess Case', () => {
    afterEach(() => sinon.restore());

    it('getAll', async () => {
      sinon.stub(productService, 'getAll').resolves({
        type: null,
        message: [getAllMockWithData],
      });
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productControler.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([getAllMockWithData]);
    });

    it('getById', async () => {
      sinon.stub(productService, 'getById').resolves({
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

      await productControler.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([getDataByIdMock]);
    });
  });
});