let timer = require('./timer');
let q = require('Q');

describe('URL performance testing', function() {
  it('should execute all urls', function(done) {
    console.log(JSON.stringify(process.env.TESTS));

    return testSuite.reduce(function(p, test) {
      return p.then(function() {
        return timer.getTimed(test);
      });
    }, q()).then(function() {
      done();
    });
  });
});
