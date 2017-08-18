
console.error('Made it here');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let mongoose = require('mongoose');
// const log = require('electron-log');

console.error('Made it here');

require('../../app/models/reportmodel');
require('../../app/models/testmodel');

let config = require('../../../config');

chai.use(chaiAsPromised);

global.assert = chai.assert;
global.testSuite = [];

let conn;

let mongodbUri = config.connectionString;
let mongodbOptions = config.options;

before(function(done) {
  console.error('Made it here');
  mongoose.connect(mongodbUri, mongodbOptions);
  conn = mongoose.connection;

  conn.on('error', console.error.bind(console, 'connection error:'));

  conn.once('open', function() {
    console.log('Connected!');

    global.testSuite = JSON.parse(process.env.TESTS);

    let Test = mongoose.model('Test');

    done();
  });

  browser.driver.manage().window().setPosition(-10000, 0);
});

after(function(done) {
  conn.close(function() {
    console.log('Close connection...');
    done();
  });
});

require('./perf.e2e');
