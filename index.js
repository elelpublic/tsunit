"use strict";
exports.__esModule = true;
var tsunit_1 = require("./tsunit");
var testRun = new tsunit_1.TestRun("Array test");
var array;
testRun.setup(function () {
    array = [];
});
testRun.test("new array", function () {
    testRun.assertEqual("size 0", 0, array.length);
});
var log = testRun.getLog();
var text = log.getText();
document.getElementById("out").innerHTML = text;
