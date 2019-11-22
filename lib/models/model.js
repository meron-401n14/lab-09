'use strict';

/** 
 * A class representing a data model in our database
 * This is in fact a wrapper for mongoose model
 * @constructor
 * @property schema (mongoose)
 */
class Model {
  constructor(schema) {
    this.schema = schema;
  }

  /**
 * This function validate function parameters this.schema.jsonSchema
 * @return valid schema 
 * 
 */
 
  jsonSchema() {
    //console.log(typeof this.schema.jsonSchema);
    return typeof this.schema.jsonSchema === 'function'
      ? this.schema.jsonSchema()
      : {};
  }
  /**
 * This function get a record by thier id, from our mongoDB.
 * @param {ObjectID} _id  and find a records by thier id 
 */

  get(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }
  /**
 * This function an argument and create new object in our mongoDB and save it 
 * @param {object} record
 * @return  {object}   newly created object in our data record and run save the record 
 */
  create(record) {
    //console.log('r', record);
    let newRecord = new this.schema(record);
    //console.log('n', newRecord);
    return newRecord.save();
  }
  /**
   * This function takes two arguments id and record object then find a record with that id update 
   * that record and return that upated object 
   *@param {objectID}    _id   record id 
   *@param {object}    record   the record find with the given id 
   *@return {object}            udpated record 
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }
  /**
   * This function takes object id as an argument and delete that found object
   * @param {objectID} _id
   * @returns  
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;







