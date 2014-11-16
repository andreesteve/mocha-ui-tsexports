/*
    Tests to validate test classes declared in typescript
    
    tsc typescriptTestClass.ts --module commonjs
    mocha ...
*/

var assert = require('chai').assert;
var Mocha = require('mocha');
var silentReporter = '../../../test/helpers/silentReporter';
var baseFolder = 'bin/';

function readTestFile(mocha, fileName) {
    var testFile = baseFolder + fileName;
    mocha.ui('../../../lib/tsexports');
    mocha.addFile(testFile);    
}

describe('typeScript Tests', function() {
      
    describe('test discovery', function() {
        var mocha = new Mocha();
    
        before(function(done) {
            readTestFile(mocha, 'typescriptTestClass.js');
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
        
        it('must recognize classSetup, classCleanup, testSetup and testCleanup', function() {
            var suite = mocha.suite.suites[0];
            assert.lengthOf(suite._beforeAll, 1, 'beforeAll');
            assert.lengthOf(suite._beforeEach, 1, 'beforeEach');
            assert.lengthOf(suite._afterEach, 1, 'afterEach');
            assert.lengthOf(suite._afterAll, 1, 'afterAll');
        });
    });
    
    describe('test execution', function() {
        var mocha = new Mocha();
        var tests;
        
        before(function(done) {
            mocha.reporter(silentReporter);
            readTestFile(mocha, 'typescriptTestSuite.js');
            mocha.run(function() {
                tests = (mocha.suite.suites || [{ tests: [] }])[0].tests;
                done();
            });
        });
        
        it('assert suite and test count expectation', function() {
            assert.equal(mocha.suite.suites.length, 1, 'only one suite expected');            
            assert.equal(mocha.suite.suites[0].tests.length, 4, '4 tests were expected');
        });
        
        it('verify that tests are executed', function() {            
            assert.equal(tests[0].title, 'testCaseThatMustPass', 'unexpected test name');
            assert.equal(tests[0].state, 'passed', 'unexpected test result');
            assert.equal(tests[1].title, 'testCaseThatMustFail', 'unexpected test name');
            assert.equal(tests[1].state, 'failed', 'unexpected test result');
            assert.equal(tests[2].title, 'testCaseUsingInstanceContext', 'unexpected test name');            
            assert.equal(tests[3].title, 'getInstance', 'unexpected test name');
            assert.equal(tests[3].state, 'passed', 'unexpected test result');            
        });
        
        it("verify that tests are executed under class' instance context", function() {
            assert.equal(tests[2].state, 'passed');
        });
        
        it('verify that classSetup and classCleanup are called only once', function() {
            var testClassInstance = tests[3].fn();
            assert.equal(1, testClassInstance.classSetupCounter, 'class setup');
            assert.equal(1, testClassInstance.classCleanUpCounter, 'class cleanup');
        });
        
        it('verify that testSetup and testCleanup are called once per test', function() {
            var testClassInstance = tests[3].fn();
            var numberOfTests = tests.length;
            assert.equal(numberOfTests, testClassInstance.testSetupCounter, 'class setup');
            assert.equal(numberOfTests, testClassInstance.testCleanUpCounter, 'class cleanup');
        });
    });
});