import { TestRun } from "../tsunit";
import { Stack } from "./samplecode";

let testRun = new TestRun( "Stack" );

let stack: Stack;

testRun.setup( () => {
  stack = new Stack();
});

testRun.test( "new stack", () => {

  testRun.assertTrue( "is empty", stack.isEmpty() );
  testRun.assertEqual( "size 0", 0, stack.size() );

});

testRun.test( "push", () => {

  stack.push( "a" );
  testRun.assertTrue( "not empty", !stack.isEmpty() );
  testRun.assertEqual( "size 1", 1, stack.size() );

});

testRun.test( "pop", () => {

  stack.push( "b" );
  let item = stack.pop();
  testRun.assertTrue( "empty after push pop", stack.isEmpty() );  
  testRun.assertEqual( "size 0", 0, stack.size() );
  testRun.assertEqual( "pop returns last pop", "b", item );

});

testRun.test( "last in first out", () => {

  stack.push( "a" );
  stack.push( "b" );
  stack.push( "c" );
  
  testRun.assertEqual( "size many", 3, stack.size() );

  testRun.assertEqual( "LIFO", "c", stack.pop() );
  testRun.assertEqual( "LIFO", "b", stack.pop() );
  testRun.assertEqual( "LIFO", "a", stack.pop() );
  
  testRun.assertTrue( "empty at last", stack.isEmpty() );  
  testRun.assertEqual( "size 0", 0, stack.size() );
  
});

testRun.logSummary();


