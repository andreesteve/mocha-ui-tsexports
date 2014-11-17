mocha-ui-tsexports
==================

This mocha UI addon provides a way to represent test cases using classes.
Currently supporting [TypeScript](http://www.typescriptlang.org/) classes compiled as commonJS.
Each class is represented as a test suite, and each method in the class is a test case.

Installation
------------

    npm install mocha-ui-tsexports

Usage
-----

Command line:

    mocha -u mocha-ui-tsexports [files]

Programmatically:

```javascript
var Mocha = require('mocha');
mocha.ui('mocha-ui-tsexports');
mocha.addFile($TESTFILE$);
mocha.run();
```

Example
-------

#### TypeScript

Code under test (myProject/src/MyModule.ts):

```typescript
export module MyModule {
    export class MyClass {
        public myMethod() {
            // do my stuff
            return 1 + 1;
        }
    }
}
```

Test class (myProject/test/MyTestClass.ts)

```typescript
var MyModule = require('../src/MyModule.ts').MyModule;
var assert = require('assert');

export class MyTestClass {
    public classSetup() {
        // do some prepration before all tests
    }
    
    public testSetup() {
        // do some preparation before each test
    }

    public myTestMethod() {
        assert.equal(new MyModule.MyClass().myMethod(), 2);
    }
    
    public testCleanup() {
        // do some cleanup after each test
    }
    
    public classCleanup() {
        // do some cleanup after all tests
    }
}
```

Then compile and run the tests

```bash
~/project$ tsc src/*.ts test/*.ts --module commonjs
~/project$ mocha -ui mocha-ui-tsexports test/*.js
```
