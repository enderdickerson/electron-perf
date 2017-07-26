// let mongoose = require('mongoose');
//
// let TestSchema = new mongoose.Schema({
//   url: String,
//   wait: Number,
//   runs: Number
// });
//
// module.exports = mongoose.model('Test', TestSchema);

// let mongoose = require('mongoose');
import * as mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  url: String,
  wait: Number,
  runs: Number
});

const Test = mongoose.model('Test', testSchema);

export default Test;
