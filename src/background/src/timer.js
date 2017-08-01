let reporter = require('./reporter');
let NanoTimer = require('nanotimer');
let q = require('Q');

module.exports.getTimed = getTimed;

function getTimed(arr, deferred, repeat) {
  deferred = deferred || q.defer();

  browser.get(arr.url);

  let timed = new NanoTimer();

  timed.time(function(callback) {
    if (arr.isAngular !== false && arr.isAngular !== undefined) {
      browser.waitForAngular().then(function() {
        callback();
      });
    } else {
      browser.ignoreSynchronization = true;
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
        let pauseAfter = arr.waitAfter || 0;
        setTimeout(function() {
          deferred.resolve();
        }, (pauseAfter) * 1000);
      }
    });
  });

  return deferred.promise;
}
