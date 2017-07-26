// let mongoose = require('mongoose');
// let ResultSchema = require('./resultmodel');
//
// let ReportSchema = new mongoose.Schema({
//   name: String,
//   results: [ResultSchema]
// });
//
// module.exports = mongoose.model('Report', ReportSchema);

import * as mongoose from 'mongoose';
import Result from './resultmodel';

const reportSchema = new mongoose.Schema({
  name: String,
  results: [Result]
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
