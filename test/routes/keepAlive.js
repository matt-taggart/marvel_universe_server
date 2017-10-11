const request = require('supertest');
const { assert } = require('chai');

const agent = request.agent('http://localhost:3000');

describe('Keep Alive Endpoint', function() {
  it('Should respond with status code 200', function(done) {
    agent.get('/keepAlive')
      .expect(200, done);
  });
});
