var Suite = require('mocha/lib/suite'),
    Test = require('mocha/lib/test');

function isTestCase(methodName) {
    // any method whose name starts with '_' is not considered a test case
    return methodName.indexOf('_') != 0;
};
    
function handleClass(className, ctor, parentSuite, file) {
    var instance = new ctor();
    var suite = Suite.create(parentSuite, className);
    
    // create tests based on class instance
    for (var key in instance) {
        var fn = instance[key];
        
        if (typeof fn == 'function') {        
            switch (key.toLowerCase()) {
                case 'classsetup':
                    suite.beforeAll(fn);
                    break;
                    
                case 'classcleanup':
                    suite.afterAll(fn);
                    break;
                    
                case 'testsetup':
                    suite.beforeEach(fn);
                    break;
                    
                case 'testcleanup':
                    suite.afterEach(fn);
                    break;
                    
                default:
                    if (isTestCase(key)) {
                        var test = new Test(key, fn);
                        test.file = file;
                        suite.addTest(test);                        
                    }
                    break;
            }
        }
    }
};
    
module.exports = function(suite) {

    suite.on('require', visit);
    
    function visit(obj, file) {
        // for each entry exported on module
        for (var key in obj) {
            var fn = obj[key];
            // if it's a function
            if ('function' == typeof fn) {
                // assume it's a class definition
                handleClass(key, fn, suite, file);
            }
        }
    }
};