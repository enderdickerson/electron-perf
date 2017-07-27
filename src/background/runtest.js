let child_process = require('child_process');
let q = require('Q');
let args = require('yargs').argv;
let config = require('../../config')
const path = require('path');

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

  if (args.tests) {
    let tests = JSON.parse(args.tests);

    console.log('Tests for this process to run: ', tests);
  }

  const protractorPath = path.join('node_modules', 'protractor', 'bin', 'protractor');

  const confPath = path.join('src', 'background', 'src', 'protractorconf.js');

  // runCmdExec('node ' + protractorPath + ' ' + confPath, deferred);

  // runCmdExec('node node_modules\\protractor\\bin\\protractor src/background/src/protractorconf.js', deferred);

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

  if (config.proxy) {
    console.log('using proxy: ' + config.proxy);
  }

  const webdriverPath = path.join('node_modules', 'webdriver-manager', 'bin',
    'webdriver-manager');

  runCmdExec('node ' + webdriverPath + ' update --ignore_ssl ' + (config.proxy ? ('--proxy ' + config.proxy) : '') + ' --gecko false', deferred);

  return deferred.promise;
}
