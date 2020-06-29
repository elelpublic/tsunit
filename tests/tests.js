"use strict";
exports.__esModule = true;
var tsunit_1 = require("../tsunit");
var testRun = new tsunit_1.TestRun("tsunit");
var t; // the object to be tested
var c = 0;
testRun.setup(function () {
    t = new tsunit_1.TestRun("self test #" + (c++), true);
    t.getLog().setQuiet(true);
});
testRun.test("no tests", function () {
    testRun.assertTrue("no tests is true", t.getSummary().noTests());
    testRun.assertTrue("no tests: all ok", t.getSummary().allOk());
    testRun.assertEqual("no successes", 0, t.getSummary().getSuccesses());
    testRun.assertEqual("no failures", 0, t.getSummary().getFailures());
    testRun.assertEqual("no error", 0, t.getSummary().getErrors());
    testRun.assertEqual("no tests", 0, t.getSummary().getTestCount());
});
testRun.test("success", function () {
    t.test("test success", function () {
        t.assertTrue("success", true);
    });
    testRun.assertEqual("one success", 1, t.getSummary().getSuccesses());
    testRun.assertEqual("no failures", 0, t.getSummary().getFailures());
    testRun.assertEqual("no error", 0, t.getSummary().getErrors());
    testRun.assertTrue("all ok", t.getSummary().allOk());
});
testRun.test("failure", function () {
    t.test("test failure", function () {
        t.assertTrue("failure", false);
    });
    testRun.assertEqual("one failure", 1, t.getSummary().getFailures());
    testRun.assertEqual("no success", 0, t.getSummary().getSuccesses());
    testRun.assertEqual("no error", 0, t.getSummary().getErrors());
    testRun.assertTrue("not all ok", !t.getSummary().allOk());
});
testRun.test("error", function () {
    t.test("test error", function () {
        throw "forced error";
    });
    var summary = t.getSummary();
    testRun.assertEqual("one error", 1, summary.getErrors());
    testRun.assertTrue("not all ok", !t.getSummary().allOk());
});
testRun.test("assertTrue", function () {
    t.test("test assertTrue", function () {
        t.assertTrue("assertTrue", true);
    });
    testRun.assertEqual("one success", 1, t.getSummary().getSuccesses());
    t.test("test assertTrue", function () {
        t.assertTrue("assertTrue", false);
    });
    testRun.assertEqual("one failure", 1, t.getSummary().getFailures());
});
testRun.test("assertEqual", function () {
    t.test("test assertEqual", function () {
        t.assertEqual("assertEqual", 10, 10);
    });
    testRun.assertEqual("one success", 1, t.getSummary().getSuccesses());
    t.test("test assertEqual", function () {
        t.assertEqual("assertEqual", 10, 11);
    });
    testRun.assertEqual("one failure", 1, t.getSummary().getFailures());
});
testRun.test("assertNull", function () {
    t.test("test assertNull", function () {
        t.assertNull("assertNull", null);
    });
    testRun.assertEqual("one success", 1, t.getSummary().getSuccesses());
    t.test("test assertNull", function () {
        t.assertNull("assertNull", "hello");
    });
    testRun.assertEqual("one failure", 1, t.getSummary().getFailures());
});
testRun.test("assertNotNull", function () {
    t.test("test assertNotNull", function () {
        t.assertNotNull("assertNotNull", "hello");
    });
    testRun.assertEqual("one success", 1, t.getSummary().getSuccesses());
    t.test("test assertNotNull", function () {
        t.assertNotNull("assertNotNull", null);
    });
    testRun.assertEqual("one failure", 1, t.getSummary().getFailures());
});
testRun.logSummary();
