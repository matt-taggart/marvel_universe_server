const request = require('supertest');
const { assert } = require('chai');

const agent = request.agent('http://localhost:3000');

describe('Creator Endpoints', function() {
  it('Should get all creators from Marvel API', function(done) {
    agent
      .get('/creators')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const data = response.body.data;
        assert.containsAllKeys(data[0], [
          'id',
          'firstName',
          'middleName',
          'lastName',
          'suffix',
          'fullName',
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

  it('Should get individual creator from Marvel API', function(done) {
    agent
      .get('/creators/2289')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const data = response.body.data;
        assert.containsAllKeys(data[0], [
          'id',
          'firstName',
          'middleName',
          'lastName',
          'suffix',
          'fullName',
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

  it('Should get all events for an individual creator from Marvel API', function(done) {
    agent
      .get('/creators/4139/events')
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

  it('Should get all series for an individual creator from Marvel API', function(done) {
    agent
      .get('/creators/2289/series')
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
      })
      .catch(done);
  });

  it('Should get all stories for an individual creator from Marvel API', function(done) {
    agent
      .get('/creators/2289/stories')
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
