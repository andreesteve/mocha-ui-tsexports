mocha-ui-tsexports
==================

Currently supporting [TypeScript](http://www.typescriptlang.org/) classes compiled as commonJS.
Each class is represented as a test suite, and each method in the class is a test class.

Installation
------------

    npm install mocha-ui-tsexports
    (Pending)

Usage
-----

Command line:

    mocha -u tsexports [files]

Programmatically:

```javascript
var Mocha = require('mocha');
mocha.ui('tsexports');
mocha.addFile($TESTFILE$); 
mocha.run();
```

Example
-------

    (Pending)