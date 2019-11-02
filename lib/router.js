'use strict';

const cwd = process.cwd();
const express = require('express');
const modelFinder = require(`${cwd}/lib/middleware/model-finder.js`);
const router = express.Router();

// loading model to the route
router.param('model', modelFinder.load);
/**
 * @route get/
 * this route jsut takes to the homepage
 * @param {object} req the request object. we don't need any body data, jsut displaying homepage
 * @param {object} res the response object
 * @param {next}  we dont use it here , but it is method to the next middleware or error middleware
 */

router.get('/', (req, res, next) => {
  res.send('Homepage');
});
/**
 * @route get/models
 * This route find lists of models
 * @param {object} req  the request object
 * @param {object} res response status '200' for list of models found
 * @param {function} next  we dont use it here
 */

router.get('/models', (req, res, next) => {
  modelFinder.list().then(models => res.status(200).json(models));
});

/**
 * @route get/:model/schema
 * This route requests of our model schema to jsonSchema
 * @param {object} req jsonSchema
 * @param {object} res  status OK or 200
 * @param {function} next we do not use it here
 */
router.get('/:model/schema', (req, res, next) => {
  res.status(200).json(req.model.jsonSchema());
});

/**
 * @route get/:model
 * @returns {object} 200 - An object with key value data
*/
router.get('/:model', handleGetAll);

/**
 * @route post/:model
 * @return  200 . An object with key-value , all data
 * next error middlware
 *
 */
router.post('/:model', handlePost);

// TODO: Swagger Comment
router.get('/:model/:id', handleGetOne);

// TODO: Swagger Comment
router.put('/:model/:id', handlePut);

// TODO: Swagger Comment
router.delete('/:model/:id', handleDelete);

// TODO: JSDoc Comment
function handleGetAll(req, res, next) {
  req.model
    .get()
    .then(data => {
      const output = {
        count: data.length,
        results: data
      };
      res.status(200).json(output);
    })
    .catch(next);
}

// TODO: JSDoc Comment
function handleGetOne(req, res, next) {
  req.model
    .get(req.params.id)
    .then(result => res.status(200).json(result[0]))
    .catch(next);
}

// TODO: JSDoc Comment
function handlePost(req, res, next) {
  req.model
    .create(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

// TODO: JSDoc Comment
function handlePut(req, res, next) {
  req.model
    .update(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

// TODO: JSDoc Comment
function handleDelete(req, res, next) {
  req.model
    .delete(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
}

module.exports = router;
