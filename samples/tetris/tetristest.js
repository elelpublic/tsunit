"use strict";
exports.__esModule = true;
var tsunit_1 = require("../../tsunit");
var tetris_1 = require("./tetris");
var t = new tsunit_1.TestRun("Tetris");
var tetris;
t.setup(function () {
    tetris = new tetris_1.Tetris();
});
t.test("default size", function () {
    t.assertEqual("default width is 10", 10, tetris.getWidth());
    t.assertEqual("default height is 20", 20, tetris.getHeight());
});
t.test("initial tetris", function () {
    t.assertEqual("initially no points", 0, tetris.getPoints());
    t.assertEqual("initially no moves", 0, tetris.getMoves());
});
t.logSummary();
