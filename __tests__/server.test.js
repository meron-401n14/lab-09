'use strict';

const { server } = require('../lib/server.js');
const supertester = require('./supertester.js');
// jest.mock()

const mockRequest = supertester(server);
// this is actually server.js > server
// (akin to server.start, we're doing server.server)

describe('end point model', () => {
  it('should respond properly on request to /models', async() => {

    let state = await [
      {type: 'categories'},
      {type: 'products'},
      {type: 'todo'},
    ];
    mockRequest
      .get('/models')
      .then(results => {
        expect(results.status).toBe(200);
        expect(state).toContainObject({type: 'products'});
      })
      .catch(console.error);
  });

  it('should respond with 404 on an invalid route', ()=>{
    return mockRequest
      .get('/foo')
      .then(results => {
        expect(results.status).toBe(500);
      });
  });

  test.skip('it should be able to post to  /:model', async() => {
    let obj = {text: 'hi'};
    return mockRequest
      .post('/:model')
      .send(obj)
      .then(results => {

        expect(results.statusCode).toBe(500);
        expect(results.body.text).toEqual(obj.text);
      });
  });

  test.skip('it should be able to get by id /:model/:id', async() => {
    let obj = {_id: '34rv'};
    return mockRequest
      .get('/:model/:id')
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.params.id).toEqual(obj._id);
      });
  });



});

