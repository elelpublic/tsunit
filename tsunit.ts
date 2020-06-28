export class TestRun {

  name: string;
  setupCode: Function;
  cleanupCode: Function;
  log = new Log();
  sums = new Summary();

  constructor( name: string, quiet: boolean = false ) {
    this.name = name;
    this.log.setQuiet( quiet );
    this.log.log( "Test run: " + name );
  }

  getLog(): Log {
    return this.log;
  }

  assertTrue( description: string, actual : boolean ) : void {
    if( actual ) {
      this.log.logOk( "OK: " + description );
      this.sums.addSuccess();
    }
    else {
      this.log.logFailure( "Failed: " + description );
      this.sums.addFailure();
    }  
  }
  
  assertEqual( description: string, expected: any, actual : any ) : void {
    if( expected == actual ) {
      this.log.logOk( "OK: " + description );
      this.sums.addSuccess();
    }
    else {
      this.log.logFailure( "Failed: " + description + ", expected: " + expected + ", actual: " + actual );
      this.sums.addFailure();
    }  
  }
  
  setup( setupCode: Function ) {
    this.setupCode = setupCode;
  }
  
  cleanup( cleanupCode: Function ) {
    this.cleanupCode = cleanupCode;
  }

  test( testName: string, testCode: Function ) {
    this.log.log( "Test: " + testName );

    try {
      if( this.setupCode != null ) {
        this.setupCode();
      }
    }
    catch( ex ) {
      this.log.logError( "Error in setup: " + testName + " " + ex );
      this.sums.addError();
      return;
    }

    try {
      testCode();
    }
    catch( ex ) {
      this.log.logError( "Error: " + testName + " " + ex );
      this.sums.addError();
    }

    try {
      if( this.cleanupCode != null ) {
        this.cleanupCode();
      }
    }
    catch( ex ) {
      this.log.log( "Error in cleanup: " + testName + " " + ex );
    }

  }

  getSummary() {
    return this.sums;
  }

  logSummary() {
    this.sums.log( this.log );
  }

}

class Log {

  quiet = false;

  log( line: string ) {
    if( !this.quiet ) {
      console.log( line );
    }
  }

  logOk( line: string ) {
    this.log( "_____ " + line );
  }
  
  logFailure( line: string ) {
    this.log( "##### " + line );
  }

  logError( line: string ) {
    this.log( "%%%%% " + line );
  }

  setQuiet( quiet: boolean ) {
    this.quiet = quiet;
  }

}

class Summary {
  
  successCount = 0;
  failureCount = 0;
  errorCount = 0;

  addSuccess() {
    this.successCount++;
  }

  addFailure() {
    this.failureCount++;
  }

  addError() {
    this.errorCount++;
  }

  allOk() : boolean {
    return this.failureCount + this.errorCount == 0;
  }

  getSuccesses() {
    return this.successCount;
  }

  getFailures() {
    return this.failureCount;
  }

  getErrors() {
    return this.errorCount;
  }

  noTests(): boolean {
    return this.successCount + this.failureCount + this.errorCount == 0;
  }

  log( log: Log ) {
    
    log.log( "--------------------------------------------" );
    log.log( "Summary" );
    log.log( "Sucessful tests: " + this.successCount );
    log.log( "Failed tests: " + this.failureCount );
    log.log( "Errors: " + this.errorCount );
    log.log( "--------------------------------------------" );

    if( this.allOk() ) {
      log.log( "SUCCESS. All OK" );
    }
    else {
      log.log( "FAILED. Some Problems." );
    }

  }

}
