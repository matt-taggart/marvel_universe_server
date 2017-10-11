require('dotenv').load();

const request = require('supertest');
const { assert } = require('chai');
const faker = require('faker');

const agent = request.agent('http://192.168.99.100:3000');

const username = faker.internet.userName();
const password = faker.internet.password();

describe('Authentication Routes', function() {
  before(function(done) {
    agent
      .post('/users')
      .send({ username, password })
      .expect(200)
      .then(response => {
        assert.equal(response.body.username, username);
        done();
      })
      .catch(done);
  });

  it('Should be invalid username', function(done) {
    agent
      .post('/login')
      .send({
        username: faker.internet.userName(),
        password,
      })
      .expect(401)
      .then(response => {
        assert.deepEqual(response.body, {
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Invalid username or password provided',
        });
        done();
      })
      .catch(done);
  });

  it('Should be invalid password', function(done) {
    agent
      .post('/login')
      .send({
        username,
        password: faker.internet.password(),
      })
      .expect(401)
      .then(response => {
        assert.deepEqual(response.body, {
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Invalid username or password provided',
        });
        done();
      })
      .catch(done);
  });

  it('Should log in and return user', function(done) {
    agent
      .post('/login')
      .send({ username, password })
      .expect(200)
      .expect('set-cookie', /marvel-universe/)
      .then(response => {
        assert.equal(response.body.username, username);
        done();
      })
      .catch(done);
  });

  it('Should logout user', function(done) {
    agent
      .delete('/logout')
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, { message: 'Logout successful' });
        done();
      })
      .catch(done);
  });
});

