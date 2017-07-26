exports.config = {
  seleniumServerJar: '../../../node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.4.0.jar',
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['main.js'],
  framework: 'mocha',
  mochaOpts: {
    enableTimeouts: false
  },
  allScriptsTimeout: 300000
};
