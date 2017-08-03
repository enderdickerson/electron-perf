let mongoose = require('mongoose');
// let ResultSchema = require('./resultmodel');

// const ResultSchema = new mongoose.Schema({
//   endTime: { type: Date, default: Date.now },
//   elapsed: String,
//   executedBy: String,
//   queryString: String,
//   version: String,
//   host: String
// });

const ReportSchema = new mongoose.Schema({
  name: String,
  results: []
});

// mongoose.model('Result', ResultSchema);
mongoose.model('Report', ReportSchema);

// module.exports.Result = ResultSchema;
// module.exports.Report = ReportSchema;


// import * as mongoose from 'mongoose';
// import Result from './resultmodel';
//
// const reportSchema = new mongoose.Schema({
//   name: String,
//   results: [Result]
// });
//
// const Report = mongoose.model('Report', reportSchema);
//
// export default Report;
