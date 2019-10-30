'use strict';

const Model = require('../model.js');
const schema = require('./products-schema.js');

/**
 * A class represents Products extended from parent class Model
 * @constructor
 * @property  call super(Schema) from parent class
 */
class Products extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Products;
