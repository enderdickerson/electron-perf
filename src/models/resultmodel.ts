// let mongoose = require('mongoose');
import * as mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  endTime: { type: Date, default: Date.now },
  elapsed: String,
  executedBy: String,
  queryString: String,
  version: String,
  host: String
});

const Result = mongoose.model('Result', resultSchema);

export default Result;

// let ResultSchema = new mongoose.Schema({
//   endTime: { type: Date, default: Date.now },
//   elapsed: String,
//   executedBy: String,
//   queryString: String,
//   version: String,
//   host: String
// });

// modules.exports = mongoose.model('Result', ResultSchema);
