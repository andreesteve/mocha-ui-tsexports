import BaseClass = require('./typescriptTestSuite');

export class ChildClass extends BaseClass.TypescriptTestSuite {
    public thisIsChild20;
    
    public _protectedMethod() {        
    }

    public classSetup() {
        super.classSetup();
        this.thisIsChild20 = 20;
    }
    
    public testSetup() {
        this.testSetupCounter += 2;
    }
    
    public childTestMethod() {

    }
}