
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const sinon = require('sinon');

// const app = require('../app');
// const emploees = require('../routes/emploees');
const userService = require('../services/userService');
const DBService = require('../services/DBService');

// chai.use(chaiHttp);

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
    it('it should GET one emploee by id', async () => {
      const checkIdStub = sinon.stub(UserService, '_checkId').returns('false');
      const checkDataStub = sinon.stub(UserService, '_checkData').returns('object');

      const id = 35;
      const result = await userService.getEmploeesById(id);
      done();
      console.log(result);
      expect(result).should.be.an('object');

      expect(checkIdStub.calledOnce).to.be.false;
      // expect(checkDataStub.calledOnce).to.be.object;

    });
  });

  // describe('/GET emploees', () => {
  //     it('it should GET all the emploees', (done) => {
  //       chai.request(app)
  //           .get('/emploees')
  //           .end((err, res) => {
  //               res.should.have.status(200);
  //               res.body.should.be.a('array');
  //             done();
  //           });
  //     });
  // });

  // describe('/POST emploee', () => {
  //   it('it should  POST an emploees', (done) => {
  //     let emploee = {
  //         name: 'oleg',
  //         mail: 'oleg@gmail.com',
  //         city: 'odessa',
  //         age: 28
  //     };
  //     chai.request(app)
  //         .post('/emploees')
  //         .send(emploee)
  //         .end((err, res) => {
  //             res.should.have.status(201);
  //             res.body.should.be.a('object');
  //             res.body.should.have.property('message');
  //           done();
  //         });
  //   });

  // });

});