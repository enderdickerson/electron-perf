let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let mongoose = require('mongoose');
require('./reportmodel');
require('./testmodel');

let Test = mongoose.model('Test');

let config = require('../config');

chai.use(chaiAsPromised);

global.assert = chai.assert;
global.testSuite = [];

let conn;

let mongodbUri = config.connectionString();
let mongodbOptions = config.options();

before(function(done) {
  mongoose.connect(mongodbUri, mongodbOptions);
  conn = mongoose.connection;

  conn.on('error', console.error.bind(console, 'connection error:'));

  conn.once('open', function() {
    console.log('Connected!');

    Test.find({}).exec(function(err, tests) {
      if (err) {
        console.error(err);
      }

      console.log('Test suite:', tests);
      global.testSuite = tests || [];
      done();
    });
  });
});

after(function(done) {
  conn.close(function() {
    console.log('Close connection...');
    done();
  });
});

require('./perf.e2e');