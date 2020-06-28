import { TestRun } from "../tsunit";

let testRun = new TestRun( "tsunit" );

let t: TestRun; // the object to be tested
let c = 0;

testRun.setup( () => {
  t = new TestRun( "self test #" + (c++), true );
  t.getLog().setQuiet( true );
});

testRun.test( "no tests", () => {

  testRun.assertTrue( "no tests is true", t.getSummary().noTests() );
  testRun.assertTrue( "no tests: all ok", t.getSummary().allOk() );
  testRun.assertEqual( "no successes", 0, t.getSummary().getSuccesses() );
  testRun.assertEqual( "no failures", 0, t.getSummary().getFailures() );
  testRun.assertEqual( "no error", 0, t.getSummary().getErrors() );

});

testRun.test( "success", () => {

  t.test( "test success", () => {
    t.assertTrue( "success", true );
  });
  testRun.assertEqual( "one success", 1, t.getSummary().getSuccesses() );
  testRun.assertEqual( "no failures", 0, t.getSummary().getFailures() );
  testRun.assertEqual( "no error", 0, t.getSummary().getErrors() );
  testRun.assertTrue( "all ok", t.getSummary().allOk() );

});

testRun.test( "failure", () => {

  t.test( "test failure", () => {
    t.assertTrue( "failure", false );
  });
  testRun.assertEqual( "one failure", 1, t.getSummary().getFailures() );
  testRun.assertEqual( "no success", 0, t.getSummary().getSuccesses() );
  testRun.assertEqual( "no error", 0, t.getSummary().getErrors() );
  testRun.assertTrue( "not all ok", !t.getSummary().allOk() );

});

testRun.test( "error", () => {

  t.test( "test error", () => {
    throw "forced error";
  });

  let summary = t.getSummary();

  testRun.assertEqual( "one error", 1, summary.getErrors() );
  testRun.assertTrue( "not all ok", !t.getSummary().allOk() );

});

testRun.test( "assertTrue", () => {

  t.test( "test assertTrue", () => {
    t.assertTrue( "assertTrue", true );    
  })

  testRun.assertEqual( "one success", 1, t.getSummary().getSuccesses() );

  t.test( "test assertTrue", () => {
    t.assertTrue( "assertTrue", false );    
  })

  testRun.assertEqual( "one failure", 1, t.getSummary().getFailures() );

})

testRun.test( "assertEqual", () => {

  t.test( "test assertEqual", () => {
    t.assertEqual( "assertEqual", 10, 10 );    
  })

  testRun.assertEqual( "one success", 1, t.getSummary().getSuccesses() );

  t.test( "test assertEqual", () => {
    t.assertEqual( "assertEqual", 10, 11 );    
  })

  testRun.assertEqual( "one failure", 1, t.getSummary().getFailures() );

})

testRun.logSummary();

