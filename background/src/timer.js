let reporter = require('./reporter');
let NanoTimer = require('nanotimer');
let q = require('Q');

module.exports.getTimed = getTimed;

function getTimed(arr, deferred, repeat) {
  deferred = deferred || q.defer();

  browser.get(arr.url);

  let timed = new NanoTimer();

  timed.time(function(callback) {
    if (process.env.USE_ANGULAR !== 'false') {
      browser.waitForAngular().then(function() {
        callback();
      });
    } else {
      callback();
    }
  }, '', 's', function(elapsed) {
    return reporter.log(elapsed, arr.url).then(function() {
      repeat = repeat || 1;

      if (arr.runs && (repeat !== arr.runs && repeat < arr.runs)) {
        let pause = arr.wait || 0;
        setTimeout(function() {
          getTimed(arr, deferred, repeat + 1);
        }, (pause * 1000));
      } else {
        deferred.resolve();
      }
    });
  });

  return deferred.promise;
}