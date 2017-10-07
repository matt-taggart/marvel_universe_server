const request = require('supertest');
const { assert } = require('chai');

let agent = request.agent('http://localhost:3000');

describe('Character Endpoints', function() {
  before(function() {
    process.env.PGDATABASE = 'test';
  });

  it('Should get all characters from Marvel API', function(done) {
    agent
      .get('/characters')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, response) {
        if (err) return done(err);
        const data = response.body.data;
        assert.isArray(data);
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
      });
  });

  it('Should get individual character from Marvel API', function(done) {
    agent
      .get('/characters/1011334')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, response) {
        if (err) return done(err);
        const data = response.body.data;
        assert.isArray(data);
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
      });
  });

  it('Should get all comics for an individual character from Marvel API', function(done) {
    agent
      .get('/characters/1011334/comics')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, response) {
        if (err) return done(err);
        const data = response.body.data;
        assert.isArray(data);
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
      });
  });

  it('Should get all events for an individual character from Marvel API', function(done) {
    agent
      .get('/characters/1011334/events')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, response) {
        if (err) return done(err);
        const data = response.body.data;
        assert.isArray(data);
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
      });
  });

  it('Should get all series for an individual character from Marvel API', function(done) {
    agent
      .get('/characters/1011334/series')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, response) {
        if (err) return done(err);
        const data = response.body.data;
        assert.isArray(data);
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
      });
  });

  it('Should get all stories for an individual character from Marvel API', function(done) {
    agent
      .get('/characters/1011334/stories')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, response) {
        if (err) return done(err);
        const data = response.body.data;
        assert.isArray(data);
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
      });
  });
});
