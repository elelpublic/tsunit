import { TestRun } from "./tsunit";

var testRun = new TestRun( "Array test" );

var array: number[];

testRun.setup( () => {
  array = [];
});

testRun.test( "new array", () => {

  testRun.assertEqual( "size 0", 0, array.length );

});

var log = testRun.getLog();
var text = log.getText();
document.getElementById( "out" ).innerHTML = text;
