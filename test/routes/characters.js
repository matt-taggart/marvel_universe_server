const request = require('supertest');
const { assert } = require('chai');

const agent = request.agent('http://localhost:3000');

describe('Character Endpoints', function() {
  it('Should get all characters from Marvel API', function(done) {
    agent
      .get('/characters')
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

  it('Should query results based on search', function(done) {
    agent
    .get('/characters?nameStartsWith=spider-man')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      const data = response.body.data;
      assert.equal(data[0].name, 'Spider-Man');      
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

  it('Should get individual character from Marvel API', function(done) {
    agent
      .get('/characters/1011334')
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

  it('Should get all comics for an individual character from Marvel API', function(done) {
    agent
      .get('/characters/1011334/comics')
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
          'creators',
          'characters',
          'stories',
          'events'
        ]);
        done();
      }).catch(done);
  });

  it('Should get all events for an individual character from Marvel API', function(done) {
    agent
      .get('/characters/1011334/events')
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
      }).catch(console.error);
  });

  it('Should get all series for an individual character from Marvel API', function(done) {
    agent
      .get('/characters/1011334/series')
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
          'startYear',
          'endYear',
          'rating',
          'type',
          'modified',
          'thumbnail',
          'creators',
          'characters',
          'stories',
          'comics',
          'events',
          'next',
          'previous'
        ]);
        done();
      }).catch(done);
  });

  it('Should get all stories for an individual character from Marvel API', function(done) {
    agent
      .get('/characters/1011334/stories')
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
      }).catch(done);
  });
});
