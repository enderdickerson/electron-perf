let mongoose = require('mongoose');

let ResultSchema = new mongoose.Schema({
  endTime: { type: Date, default: Date.now },
  elapsed: String,
  executedBy: String,
  queryString: String,
  version: String,
  host: String
});

let ReportSchema = new mongoose.Schema({
  name: String,
  results: [ResultSchema]
});

mongoose.model('Result', ResultSchema);
mongoose.model('Report', ReportSchema);

