/*
    Tests to validate test classes declared in typescript
    
    tsc typescriptTestClass.ts --module commonjs
    mocha ...
*/

var assert = require('chai').assert;
var Mocha = require('mocha');
var testFile = 'bin/typescriptTestClass.js';

describe('typeScript Tests', function() {
   
    var mocha = new Mocha();
    
    before(function(done) {
        mocha.ui('../../../lib/tsexports');
        mocha.addFile(testFile);
        mocha.loadFiles(done);
    });
    
    it('must recognize methods as test cases', function() {
        var suite = mocha.suite;
        assert.ok(suite, 'mocha.suite undefined');
        assert.equal(suite.suites.length, 1, 'mocha.suite.length unexpected');
        
        var testClassSuite = suite.suites[0];
        assert.equal(testClassSuite.title, 'MyTestClass', 'test class name incorrect');            
        
        var tests = testClassSuite.tests;
        assert.ok(tests, 'tests not recognized');
        assert.equal(tests.length, 2, 'incorrect number of test cases  recognized');
        assert.equal(tests[0].title, 'firstTestCase', 'missing first test case');
        assert.equal(tests[1].title, 'secondTestCase', 'missing second test case');
    });
    
    it('must not recognize helper methods as test cases', function() {
        var tests = mocha.suite.suites[0].tests;
        for (var i = 0; i < tests.length; i++) {
            assert.notEqual(tests[i].title.charAt(0), '_', 'methods starting with underline must not be considered test cases');
        }
    });
});