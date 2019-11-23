'use strict';

const Model = require('../model.js');
const schema = require('./categories-schema.js');

/**
 * A class to represent categories which is extended from Model parent class
 * @ constructor
 * @property  a function call super(schema) from parent class
 */
class Categories extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Categories;
