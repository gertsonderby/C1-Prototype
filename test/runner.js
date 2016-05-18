import mocha from 'mocha';
import tests from './suite.js';

mocha.suite.on('pre-require', function(context) {
  var exports = window;

  exports.afterEach = context.afterEach || context.teardown;
  exports.after = context.after || context.suiteTeardown;
  exports.beforeEach = context.beforeEach || context.setup;
  exports.before = context.before || context.suiteSetup;
  exports.describe = context.describe || context.suite;
  exports.it = context.it || context.test;
  exports.setup = context.setup || context.beforeEach;
  exports.suiteSetup = context.suiteSetup || context.before;
  exports.suiteTeardown = context.suiteTeardown || context.after;
  exports.suite = context.suite || context.describe;
  exports.teardown = context.teardown || context.afterEach;
  exports.test = context.test || context.it;
  exports.run = context.run;

  // now use SystemJS to load all test files
  Promise
    .all(tests.map(function(testScript) {
      return System.import(testScript);
    })).then(function() {
      mocha.checkLeaks();
      mocha.run();
    }, function(err) {
      console.error("Error loading test modules");
      console.error(err);
    });

});

mocha.setup('bdd');
