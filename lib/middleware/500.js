'use strict';
/**
 * this error middleware takes an error and sets the response status and sends 
 * any error data as the response body
 * @param {object} err  - An error which has keys error and err
 * @return {Error}  - 500
 * @return {string}   - The error message
 * 
 */

module.exports = (err, req, res, next) => {
  let error = { error: err };
  res
    .status(500)
    .json(error)
    .end();
};
