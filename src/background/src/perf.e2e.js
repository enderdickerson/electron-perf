let timer = require('./timer');
let q = require('q');
// const log = require('electron-log');
// console.log = log.info;

describe('URL performance testing', function() {
  it('should execute all urls', function(done) {
    console.error(JSON.stringify(process.env.TESTS));

    return testSuite.reduce(function(p, test) {
      return p.then(function() {
        return timer.getTimed(test);
      });
    }, q()).then(function() {
      done();
    });
  });
});
