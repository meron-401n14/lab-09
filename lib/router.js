'use strict';

const cwd = process.cwd();
const express = require('express');
const modelFinder = require(`${cwd}/lib/middleware/model-finder.js`);
const router = express.Router();

// this a param to load model using modelFinder middleware 
 
router.param('model', modelFinder.load);

/**
 * @route get/
 * this route jsut takes to the homepage
 * @param {object} req  we don't request anything here 
 * @param {object} res   send homePage message to our app home direcory 
 * @param {function}  next  dont use it here 
 */

router.get('/', (req, res, next) => {
  res.send('Homepage');
});
/**
 * @route GET /models
 * @param {object} req  we do not use it here 
 * @param {object} res  200.  call modelfinder.
 * list function  and pass to our model and response our model load
 * if we provide wrong route it res  "MODULE_NOT_FOUND" error message
 * @param {function} next  
 */
 
router.get('/models', (req, res, next) => {
  modelFinder.list().then(models => res.status(200).json(models));
});

/**
 * @route GET  /:model/schema

 * @param {object} req  req for model schema 
 * @param {object} res  status OK or 200
 * @param {function} next we do not use it here
 * This route a path to request our model schema
 */
router.get('/:model/schema', (req, res, next) => {
  res.status(200).json(req.model.jsonSchema());
});

/**
 * @route GET  /:model
 * @param {function} handleGetAll
 * this function req.model and get records by query and res 200. for success and get all records 
*/
router.get('/:model', handleGetAll);

/**
 * @route POST /:model
 * @param {function} handlePost
 * this route call a function handlePost which enables to create a new object
 * req.model and req.body and create object against our model
 * res the status (200) and newly created object 
 *
 */

router.post('/:model', handlePost);
/**
 * @route GET /:model/:id
 * @param {function}     handleGetOne  call this function
 * this function req.model , req.params.id then res 200 status and result at index 0
*/
router.get('/:model/:id', handleGetOne);
/**
 * @route PUT /:model/:id
 * @param {function} handlePut
 * this route calls handlePut function which req.model, req.params.id & req.body
 * and update a record with that id and res (200) and updated record 
 */
router.put('/:model/:id', handlePut);
/**
 * @route DELETE /:model/:id
 * @param {function}  handleDelete
 * this route call handleDelete function and the function which req.model, req.params.id 
 * and delete a record with that id and res (200).success deletion 
 */
router.delete('/:model/:id', handleDelete);


/** ============================================//================================================*/

// JSDoc comments for all functions 

/**
 * This function hadles getting all records by query 
 * @param {object} req   req.model for our model data query 
 * @param {object} res   - (200).status and records and record length of our data 
 * @param {function} next to error catch middle ware
 */
function handleGetAll(req, res, next) {
  req.model
    .get()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch(next);
}

/**
 * this function helps to get a record by its ID from our model's mongoDB
 * @param {object} req    req.model, req.params.id to get a record with given id 
 * @param {object} res    (200) status  and record with given id at index 0 
 * @param {function} next  call ctach error middleware function 
 */
function handleGetOne(req, res, next) {
  req.model
    .get(req.params.id)
    .then(result => res.status(200).json(result[0]))
    .catch(next);
}

/**  
 * This function helps to create a new object in our MongoDB
 * @param {object} req       req.model, req.body 
 * @param {object} res       status(200) created object in our model's mongoDB
 * @param {function} next     call next middlewre error catch function 
 */
function handlePost(req, res, next) {
  req.model
    .create(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}
/**
 * This functions handle updating a record from our model's mongoDb
 * @param {object} req   req.model, req.params.id and req.body 
 * @param {object} res   200 status and updated record from our model's data 
 * @param {function} next  call next error catch middleware 
 */
function handlePut(req, res, next) {
  req.model
    .update(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

/**
 * This function hadndles delete a recored from our model's MongoDB
 * @param {object} req      req. model, req.params.id  of record 
 * @param {object} res      200 status result of deletion 
 * @param {function} next   catch error middleware function 
 */
function handleDelete(req, res, next) {
  req.model
    .delete(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
}





module.exports = router;

