let child_process = require('child_process');
let q = require('q');
let config = require('../../config');
const path = require('path');

// const logger = require('electron-log');

process.on('message', function(input) {
  if (input.msgtype === 'dependencies') {
    console.error('dependencies: ', input.content);
    process.env.TESTS = JSON.stringify(input.content);
  }

  if (input.msgtype === 'command') {
    if (input.content === 'begin') {
      console.error('begin');
      output = startApp();
    }

    if (input.content === 'halt') {
      console.error('end');
      process.exit();
    }
  }
});

function startApp() {
  return setUpWebDriver()
    .then(function() {
      return startEndToEndTests();
    }).then(function() {
      process.send('finished');
    });
}

function startEndToEndTests() {
  let deferred = q.defer();

  const protractorPath = path.join(__dirname, '..', '..', 'node_modules', 'protractor', 'bin', 'protractor');

  // const unpackedProtractor = path.join(__dirname, '..', '..', '..', 'unpacked', 'protractor', 'bin', 'protractor');

  const confPath = path.join(__dirname, 'src', 'protractorconf.js');

  runCmdExec('node ' + protractorPath + ' ' + confPath, deferred);

  // return q.when();

  return deferred.promise;
}

function runCmdExec(command, promise) {
  let options = {env: process.env, stdio: 'inherit'};

  console.error('Command: ', command);

  child_process.exec(command, options, function(code, stdout, stderr) {
    if(stderr) {
      console.error('stderr:', stderr);
    }

    if(stdout) {
      console.error('stdout:', stdout);
    }

    promise.resolve(code);
  });
}

function setUpWebDriver() {
  let deferred = q.defer();

  console.error('getting update');

  if (config.proxy) {
    console.error('using proxy: ' + config.proxy);
  }

  const webdriverPath = path.join(__dirname, '..', '..', 'node_modules', 'webdriver-manager', 'bin',
    'webdriver-manager');

  // const unpackedWebdriver = path.join(__dirname, '..', '..', '..', 'unpacked', 'webdriver-manager', 'bin', 'webdriver-manager');

  runCmdExec('node ' + webdriverPath + ' update --ignore_ssl ' + (config.proxy ? ('--proxy ' + config.proxy) : '') + ' --gecko false', deferred);

  return deferred.promise;
}
