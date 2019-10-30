'use strict';

/** A class to represent model, parent class of category and product
 * @constructor
 * @property schema (mongoose)
 */
class Model {
  constructor(schema) {
    this.schema = schema;
  }

  /**
 * validating schema with jsonSchema
 * returns validated schema or blank object
 */
  // TODO: JSDoc Comment
  jsonSchema() {
    console.log(typeof this.schema.jsonSchema);
    return typeof this.schema.jsonSchema === 'function'
      ? this.schema.jsonSchema()
      : {};
  }
  /**
 * takes an id and return searched record by id
 * @param {ObjectID} _id
 *
 */
  // TODO: JSDoc Comment
  get(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }
  /**
 * takes one parameter and  return saved new created record
 * @param {object} record
 */
  create(record) {
    console.log('r', record);
    let newRecord = new this.schema(record);
    console.log('n', newRecord);
    return newRecord.save();
  }

  /**
   * takes two paramerer and returns an updated recored with the given id
  * @param {objectID} _id
   * @param {object} record
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
   * takes one parameter and return deleted recored with that id
   * @param {objectID} _id
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;



