let child_process = require('child_process');
let q = require('Q');
let args = require('yargs').argv;

process.on('message', function(input) {
  output = startApp();
  // process.send(output);
});

function startApp() {
  process.env.USE_ANGULAR = args.angular !== 'false';

  return setUpWebDriver()
    .then(function() {
      return startEndToEndTests();
    });
}

function startEndToEndTests() {
  let deferred = q.defer();

  runCmdExec('node node_modules\\protractor\\bin\\protractor src/background/src/protractorconf.js', deferred);

  return deferred.promise;
}

function runCmdExec(command, promise) {
  let options = {env: process.env, stdio: 'inherit'};

  child_process.exec(command, options, function(code, stdout, stderr) {
    if(stderr) {
      console.log('stderr:', stderr);
    }

    if(stdout) {
      console.log('stdout:', stdout);
    }

    promise.resolve(code);
  });
}

function setUpWebDriver() {
  let deferred = q.defer();

  console.log('getting update');

  runCmdExec('node node_modules\\webdriver-manager\\bin\\webdriver-manager update --ignore_ssl ' + (args.proxy ? '--proxy ' + args.proxy : '') + ' --gecko false', deferred);

  return deferred.promise;
}
