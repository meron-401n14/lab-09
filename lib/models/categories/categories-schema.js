'use strict';

const mongoose = require('mongoose');


// mongoose schema for category model
//enabled  mongoose virtual properties.
const categories = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

//categories virtual property
// todo is a reference to a specific todo record in todo data model
// which combine feilds from category schema and todo
categories.virtual('tasks', {
  ref: 'todo',
  localField: 'name',
  foreignField: 'category',
  justOne: false,
});

/**
 * a function takes no parameter
 * returns full contents of a task record by using .populate(key)
 * error catch @param e  console loggied if it errors
 */
const populateTasks = function() {
  try {
    this.populate('tasks');
  } catch (e) {
    console.error('Find Error', e);
  }
};

//Before Mongoose request endpoint find()
// run populateTasked function in order to keep track of task record when category record is located
categories.pre('find', populateTasks);

// exports category mongoose schema
module.exports = mongoose.model('categories', categories);

