'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var assertFileContentsEqual = function(test, actualFile, expectedFile, message) {

  var actual = grunt.file.read(actualFile);
  var expected = grunt.file.read(expectedFile);
  test.equal(actual, expected, message);
};

exports.angularPreprocessor = {

  setUp: function(done) {
    // setup here if necessary
    done();
  },
  basic_test: function(test) {

    test.expect(1);

    assertFileContentsEqual(test, 'tmp/module.js',
          'test/expected/module.js',
          'expected declarations added to generated JavaScript');

    test.done();
  }
};
