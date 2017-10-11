const request = require('supertest');
const { assert } = require('chai');

const agent = request.agent('http://localhost:3000');

describe.only('Test Endpoint Errors', function() {
  it('Should return not found', function(done) {
    agent.get('/characterzzz')
      .expect(404)
      .then(response => {
        assert.deepEqual(response.body, {
          statusCode: 404,
          error: 'Not Found',
          message: 'Not Found',
        })
        done();
      })
      .catch(done)
  });

  it('Should return method not allowed', function(done) {
    agent
      .post('/characters')
      .expect(405)
      .then(response => {
        assert.deepEqual(response.body, {
          statusCode: 405,
          error: 'Method Not Allowed',
          message: 'Method Not Allowed',
        });
        done();
      })
      .catch(done);
  });
})