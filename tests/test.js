
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const sinon = require('sinon');
// const sandbox = require('sinon').createSandbox();

const userService = require('../services/userService');
const DBService = require('../services/DBService');
const dataErrorService = require('../services/dataErrorService');

afterEach(() => {
  // Restore the default sandbox here
  sinon.restore();
});

describe('userService', () => {

  describe('getAllEmploees', () => {
    it('it should GET all emploees', async () => {
      const executeStub = sinon.stub(DBService, 'execute').resolves([]);
      const result = await userService.getAllEmploees();

      expect(result).to.be.deep.equal([]);
      expect(executeStub.calledWith('SELECT * FROM emploees')).to.be.true;
      expect(executeStub.calledOnce).to.be.true;

    });
  });

  describe('getEmploeesById', () => {
    it('it should GET one emploee by id 35', async () => {

      const id = 35;

      const checkIdStub = sinon.stub(userService, '_checkId').returns(true);
      const executeStub = sinon.stub(DBService, 'execute').resolves([{id: 35,
        name: 'rodion',
        mail: 'rodion@gmail.com',
        city: 'odessa',
        age: '31'}]);
      const checkDataStub = sinon.stub(userService, '_checkData').returns(true);

      const result = await userService.getEmploeesById(id);

      expect(checkIdStub.callCount).to.equal(1);
      expect(checkIdStub.withArgs(35).callCount).to.equal(1);
      expect(checkIdStub.calledOnce).to.be.true;
      expect(executeStub.callCount).to.equal(1, 'execute call not one time');
      expect(executeStub.calledWith('SELECT * FROM emploees WHERE id = ?')).to.be.true;
      expect(result).to.be.an('object');
      expect(checkDataStub.callCount).to.equal(1);

    });

  });
  describe('addEmploees', () => {
    it('it should add one emploee', async () => {

      const body = {
        name: 'dima',
        mail: 'dima@gmail.com',
        city: 'odessa',
        age: 30
        };

      const checkBodyStub = sinon.stub(userService, '_checkBody').returns(true);
      const executeStub = sinon.stub(DBService, 'execute').resolves({});
      const checkDataStub = sinon.stub(userService, '_checkData').returns(true);

      const result = await userService.addEmploees(body);

      expect(checkBodyStub.callCount).to.equal(1);
      expect(executeStub.callCount).to.equal(1, 'execute call not one time');
      expect(executeStub.calledWith('INSERT INTO emploees (`name`, mail, city, age) VALUES (?, ?, ?, ?)')).to.be.true;
      expect(result).to.be.an('object');
      expect(checkDataStub.calledOnce).to.be.true;

    });

  });
  describe('deleteEmploeesById', () => {
    it('it should delete one emploee by id 36', async () => {

      const id = 36;

      const checkIdStub = sinon.stub(userService, '_checkId').returns(true);
      const executeStub = sinon.stub(DBService, 'execute').resolves({});

      const result = await userService.deleteEmploeesById(id);

      expect(checkIdStub.callCount).to.equal(1);
      expect(checkIdStub.withArgs(36).callCount).to.equal(1);
      expect(checkIdStub.calledOnce).to.be.true;
      expect(executeStub.callCount).to.equal(1, 'execute call not one time');
      expect(executeStub.calledWith('DELETE FROM emploees WHERE id=?')).to.be.true;
      expect(result).to.be.an('object');

    });

  });

  describe('updateEmploeesById', () => {
    it('it should update one emploee by id 35', async () => {

      const id = 35;
      const body = {
        name: 'dima',
        mail: 'dima@gmail.com',
        city: 'odessa',
        age: 30
        };

      const checkIdStub = sinon.stub(userService, '_checkId').returns(true);
      const checkBodyStub = sinon.stub(userService, '_checkBody').returns(true);
      const executeStub = sinon.stub(DBService, 'execute').resolves({});

      const result = await userService.updateEmploeesById(body, id);
      console.log(result);

      expect(checkIdStub.callCount).to.equal(1);
      expect(checkIdStub.withArgs(35).callCount).to.equal(1);
      expect(checkIdStub.calledOnce).to.be.true;
      expect(executeStub.callCount).to.equal(1, 'execute call not one time');
      expect(executeStub.calledWith('UPDATE emploees AS e SET e.name=?, e.mail=?, e.city=?, e.age=? WHERE id=?')).to.be.true;
      expect(result).to.be.an('object');

    });

  });
  describe('checkId', () => {
    it('it should check is id data is number', async () => {
      const id = 35;

      const isNumberStub = sinon.stub(dataErrorService, 'isNumber').returns(true);

      const result = await dataErrorService.isNumber(id);
      console.log(result);

      expect(isNumberStub.callCount).to.equal(1);
      expect(isNumberStub.withArgs(35).callCount).to.equal(1);
      expect(isNumberStub.calledOnce).to.be.true;
      expect(isNumberStub.callCount).to.equal(1, 'execute call not one time');
      expect(isNumberStub.calledWith(35)).to.be.true;
      expect(result).to.be.true;

    });

  });
  describe('checkData', () => {
    it('it should check is data is not undefined', async () => {
      const data = {
        name: 'dima',
        mail: 'dima@gmail.com',
        city: 'odessa',
        age: 30
        };

      const checkDataStub = sinon.stub(userService, '_checkData').returns(true);

      const result = await userService._checkData(data);

      expect(checkDataStub.callCount).to.equal(1);
      expect(checkDataStub.withArgs(data).callCount).to.equal(1);
      expect(checkDataStub.calledOnce).to.be.true;
      expect(checkDataStub.callCount).to.equal(1, 'execute call not one time');
      expect(checkDataStub.calledWith(data)).to.be.true;
      expect(result).to.be.true;

    });

  });
  describe('checkBody', () => {
    it('it should check is data is an object', async () => {
      const body = {
        name: 'dima',
        mail: 'dima@gmail.com',
        city: 'odessa',
        age: 30
        };

      const checkBodyStub = sinon.stub(userService, '_checkBody').returns(true);

      const result = await userService._checkBody(body);

      expect(checkBodyStub.callCount).to.equal(1);
      expect(checkBodyStub.withArgs(body).callCount).to.equal(1);
      expect(checkBodyStub.calledOnce).to.be.true;
      expect(checkBodyStub.callCount).to.equal(1, 'execute call not one time');
      expect(checkBodyStub.calledWith(body)).to.be.true;
      expect(result).to.be.true;

    });

  });

});