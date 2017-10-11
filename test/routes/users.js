const request = require('supertest');
const { assert } = require('chai');
const faker = require('faker');

const agent = request.agent('http://192.168.99.100:3000');

const username = faker.internet.userName();
const password = faker.internet.password();
let id;

describe('User Routes', function() {
  it('Should successfully create user', function(done) {
    agent
    .post('/users')
    .send({ username, password })
    .expect(201)
    .then(response => {
      id = response.body.id;
      assert.equal(response.body.username, username);
      done();
    })
    .catch(done);
  });

  it('Should fail to create user already added', function(done) {
    agent
    .post('/users')
    .send({ username, password })
    .expect(400)
    .then(response => {
      assert.deepEqual(response.body, {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Username already exists',
      });
      done();
    })
    .catch(done);
  });

  it('Should get user by id', function(done) {
    agent
      .post('/login')
      .send({ username, password })
      .expect(200)
      .expect('set-cookie', /marvel-universe/)
      .then(() => {
        return agent.get(`/users/${id}`)
          .then(response => {
            assert.property(response.body, 'id');
            assert.equal(response.body.username, username);
            done();
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(done);
  });
});

