declare function require(x);
var assert = require('assert');

export class TypescriptTestSuite {
    public classSetupCounter = 0;
    public classCleanUpCounter = 0;
    public testSetupCounter = 0;
    public testCleanUpCounter = 0;
    private thisIs10 = 10;
    
    public classSetup() {
        this.classSetupCounter++;
    }
    
    public classCleanUp() {
        this.classCleanUpCounter++;
    }
    
    public testSetup() {
        this.testSetupCounter++;
    }
    
    public testCleanUp() {
        this.testCleanUpCounter++;
    }

    public testCaseThatMustPass() {
        assert(true);
    }
    
    public testCaseThatMustFail() {
        assert(false);
    }
    
    public testCaseUsingInstanceContext() {
        assert(this.thisIs10 == 10);
    }
    
    public getInstance() {
        return this;
    }
}