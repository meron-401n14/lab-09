'use strict';

const mongoose = require('mongoose');

// mongoose product schema with (name, description , price and cattegory property)
const products = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

// exports product mongoose schema
module.exports = mongoose.model('products', products);
