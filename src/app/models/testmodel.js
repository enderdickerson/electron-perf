let mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  url: String,
  wait: Number,
  runs: Number,
  isAngular: { type: Boolean, default: true }
});

mongoose.model('Test', TestSchema);

// import * as mongoose from 'mongoose';
//
// const testSchema = new mongoose.Schema({
//   url: String,
//   wait: Number,
//   runs: Number
// });
//
// const Test = mongoose.model('Test', testSchema);
//
// export default Test;
