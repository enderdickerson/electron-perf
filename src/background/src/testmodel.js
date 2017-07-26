let mongoose = require('mongoose');

let TestSchema = new mongoose.Schema({
  url: String,
  wait: Number,
  runs: Number
});

mongoose.model('Test', TestSchema);
