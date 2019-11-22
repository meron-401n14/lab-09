'use strict';
/**
 * this error middleware takes an error and sets the response status and sends 
 * any error data as the response body
 * @param {object} err  - An error which has keys error and 'Resource Not Found'
 * @return {Error}     - 404
 * @return {string}   - The error message
 * 
 */
module.exports = (req, res, next) => {
  let error = { error: 'Resource Not Found' };
  res
    .status(404)
    .json(error)
    .end();
};
