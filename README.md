# tsunit

This is a little junit-like api to unit test for typescript or javascript code.

_tsunit is made for testing in the browser. To test in nodejs, try tsunit-node._

I made this so I did not have to use any big api, any tooling, frameworks or such.
The only thing I wanted was typescript, for the strict typing and compile safety.

## Prerequisites

What you need:

* tsc - typescript compiler

For the sample tests:

* bash
* nodejs

## Usage

    import { TestRun } from "./tsunit";

    // a test run compiles some tests for one unit of code to be testet
    let testRun = new TestRun( "test my new super class" );

    let s: Superclass;

    // setup code will be performed before every test
    testRun.setup( () => {
      s = new Superclass();
    });

    // cleanup code will be performed after every test
    testRun.cleanup( () => {
      s.shutdown();
    });

    // a test has a name and may contain a number of assertions
    testRun.test( "test initialization", () => {

      testRun.assertTrue( "s should be empty", s.isEmpty() );
      testRun.assertEquals( "size is 0 initially", 0, s.size() );
      testRun.assertNull( "result should be null", s.getResult() );
      testRun.assertNotNull( "name should not be null", s.getName() );

    });

    // ... add more tests here

    // finally print some summary information about the tests
    testRun.logSummary();

## Files

    tsunit.ts - the tsunit api
    tsunit.js - the tsunit api compiled to javascript

    samples/samplecode.ts - some code under test
    samples/sampletests.ts - tests for samplecode.ts

    samples/tetris - a tetris created using ttd (test driven development) with tsunit

    tests/tests - test for tsunit (written with tsunit)

    run_compile.sh - compile all typescript to javascript
    run_samples.sh - compile and run sample tests
    run_tests.sh - compile und run tests
    run_tetristests.sh - compile und run tests on tetris

## Todos

* show mini summary after each test
* generated structured test result data
* generate html report
* add more assertions

