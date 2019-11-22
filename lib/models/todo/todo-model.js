'use strict';

const Model = require('../model.js');
const schema = require('./todo-schema.js');

/**
 * A class represent Todo extended from parent class Model
 * @constructor
 * @property super(schema) call from parent class Model
 */
class Todo extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Todo;
