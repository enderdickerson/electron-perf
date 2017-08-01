let child_process = require('child_process');
let q = require('Q');
let config = require('../../config');
const path = require('path');

process.on('message', function(input) {
  if (input.msgtype === 'dependencies') {
    console.log('dependencies: ', input.content);
    process.env.TESTS = JSON.stringify(input.content);
  }

  if (input.msgtype === 'command') {
    if (input.content === 'begin') {
      console.log('begin');
      output = startApp();
    }

    if (input.content === 'halt') {
      console.log('end');
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

  const protractorPath = path.join('node_modules', 'protractor', 'bin', 'protractor');

  const confPath = path.join('src', 'background', 'src', 'protractorconf.js');

  runCmdExec('node ' + protractorPath + ' ' + confPath, deferred);

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
