const request = require('supertest');
const { assert } = require('chai');

const agent = request.agent('http://localhost:3000');

describe.only('Comics Endpoints', function() {
  it('Should return not found', function(done) {
    agent.get('/comicszzz')
      .expect(404)
      .then(response => {
        assert.deepEqual(response.body, {
          statusCode: 404,
          error: 'Not Found',
          message: 'Not Found',
        });
        done();
      })
      .catch(done);
  });

  it('Should return method not allowed', function(done) {
    agent
      .post('/comics')
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

  it('Should get all comics from Marvel API', function(done) {
    agent
      .get('/comics')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const data = response.body.data;
        assert.containsAllKeys(data[0], [
          'id',
          'digitalId',
          'title',
          'issueNumber',
          'variantDescription',
          'description',
          'modified',
          'isbn',
          'upc',
          'diamondCode',
          'ean',
          'issn',
          'format',
          'pageCount',
          'textObjects',
          'resourceURI',
          'urls',
          'series',
          'variants',
          'collections',
          'collectedIssues',
          'dates',
          'prices',
          'thumbnail',
          'images',
          'characters',
          'stories',
          'events'
        ]);
        done();
      })
      .catch(done);
  });

  it('Should get individual comic from Marvel API', function(done) {
    agent
      .get('/comics/15878')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const data = response.body.data;
        assert.containsAllKeys(data[0], [
          'id',
          'digitalId',
          'title',
          'issueNumber',
          'variantDescription',
          'description',
          'modified',
          'isbn',
          'upc',
          'diamondCode',
          'ean',
          'issn',
          'format',
          'pageCount',
          'textObjects',
          'resourceURI',
          'urls',
          'series',
          'variants',
          'collections',
          'collectedIssues',
          'dates',
          'prices',
          'thumbnail',
          'images',
          'characters',
          'stories',
          'events'
        ]);
        done();
      })
      .catch(done);
  });

  it('Should get all characters for an individual comic from Marvel API', function(done) {
    agent
      .get('/comics/27649/characters')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const data = response.body.data;
        assert.containsAllKeys(data[0], [
          'id',
          'name',
          'description',
          'modified',
          'thumbnail',
          'resourceURI',
          'comics',
          'series',
          'stories',
          'events',
          'urls'
        ]);
        done();
      })
      .catch(done);
  });

  it('Should get all events for an individual comic from Marvel API', function(done) {
    agent
      .get('/comics/12744/events')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const data = response.body.data;
        assert.containsAllKeys(data[0], [
          'id',
          'title',
          'description',
          'resourceURI',
          'urls',
          'modified',
          'start',
          'end',
          'thumbnail',
          'creators',
          'characters',
          'stories',
          'comics',
          'series',
          'next',
          'previous'
        ]);
        done();
      })
      .catch(done);
  });

  it('Should get all stories for an individual comic from Marvel API', function(done) {
    agent
      .get('/comics/27649/stories')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const data = response.body.data;
        assert.containsAllKeys(data[0], [
          'id',
          'title',
          'description',
          'resourceURI',
          'type',
          'modified',
          'thumbnail',
          'creators',
          'characters',
          'series',
          'comics',
          'events',
          'originalIssue'
        ]);
        done();
      })
      .catch(done);
  });
});
