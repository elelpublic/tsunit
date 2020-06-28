"use strict";
exports.__esModule = true;
var TestRun = /** @class */ (function () {
    function TestRun(name, quiet) {
        if (quiet === void 0) { quiet = false; }
        this.log = new Log();
        this.sums = new Summary();
        this.name = name;
        this.log.setQuiet(quiet);
        this.log.log("Test run: " + name);
    }
    TestRun.prototype.getLog = function () {
        return this.log;
    };
    TestRun.prototype.assertTrue = function (description, actual) {
        if (actual) {
            this.log.logOk("OK: " + description);
            this.sums.addSuccess();
        }
        else {
            this.log.logFailure("Failed: " + description);
            this.sums.addFailure();
        }
    };
    TestRun.prototype.assertEqual = function (description, expected, actual) {
        if (expected == actual) {
            this.log.logOk("OK: " + description);
            this.sums.addSuccess();
        }
        else {
            this.log.logFailure("Failed: " + description + ", expected: " + expected + ", actual: " + actual);
            this.sums.addFailure();
        }
    };
    TestRun.prototype.setup = function (setupCode) {
        this.setupCode = setupCode;
    };
    TestRun.prototype.cleanup = function (cleanupCode) {
        this.cleanupCode = cleanupCode;
    };
    TestRun.prototype.test = function (testName, testCode) {
        this.log.log("Test: " + testName);
        try {
            if (this.setupCode != null) {
                this.setupCode();
            }
        }
        catch (ex) {
            this.log.logError("Error in setup: " + testName + " " + ex);
            this.sums.addError();
            return;
        }
        try {
            testCode();
        }
        catch (ex) {
            this.log.logError("Error: " + testName + " " + ex);
            this.sums.addError();
        }
        try {
            if (this.cleanupCode != null) {
                this.cleanupCode();
            }
        }
        catch (ex) {
            this.log.log("Error in cleanup: " + testName + " " + ex);
        }
    };
    TestRun.prototype.getSummary = function () {
        return this.sums;
    };
    TestRun.prototype.logSummary = function () {
        this.sums.log(this.log);
    };
    return TestRun;
}());
exports.TestRun = TestRun;
var Log = /** @class */ (function () {
    function Log() {
        this.quiet = false;
    }
    Log.prototype.log = function (line) {
        if (!this.quiet) {
            console.log(line);
        }
    };
    Log.prototype.logOk = function (line) {
        this.log("_____ " + line);
    };
    Log.prototype.logFailure = function (line) {
        this.log("##### " + line);
    };
    Log.prototype.logError = function (line) {
        this.log("%%%%% " + line);
    };
    Log.prototype.setQuiet = function (quiet) {
        this.quiet = quiet;
    };
    return Log;
}());
var Summary = /** @class */ (function () {
    function Summary() {
        this.successCount = 0;
        this.failureCount = 0;
        this.errorCount = 0;
    }
    Summary.prototype.addSuccess = function () {
        this.successCount++;
    };
    Summary.prototype.addFailure = function () {
        this.failureCount++;
    };
    Summary.prototype.addError = function () {
        this.errorCount++;
    };
    Summary.prototype.allOk = function () {
        return this.failureCount + this.errorCount == 0;
    };
    Summary.prototype.getSuccesses = function () {
        return this.successCount;
    };
    Summary.prototype.getFailures = function () {
        return this.failureCount;
    };
    Summary.prototype.getErrors = function () {
        return this.errorCount;
    };
    Summary.prototype.noTests = function () {
        return this.successCount + this.failureCount + this.errorCount == 0;
    };
    Summary.prototype.log = function (log) {
        log.log("--------------------------------------------");
        log.log("Summary");
        log.log("Sucessful tests: " + this.successCount);
        log.log("Failed tests: " + this.failureCount);
        log.log("Errors: " + this.errorCount);
        log.log("--------------------------------------------");
        if (this.allOk()) {
            log.log("SUCCESS. All OK");
        }
        else {
            log.log("FAILED. Some Problems.");
        }
    };
    return Summary;
}());
