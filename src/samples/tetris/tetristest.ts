import { TestRun } from "../../tsunit";
import { Tetris } from "./tetris";

let t = new TestRun( "Tetris" );
let tetris: Tetris;

t.setup( () => {
  tetris = new Tetris();
});

t.test( "default size", () => {

  t.assertEqual( "default width is 10", 10, tetris.getWidth() );
  t.assertEqual( "default height is 20", 20, tetris.getHeight() );

  for( let y = 0; y < tetris.getHeight(); y++ ) {
    for( let x = 0; x < tetris.getHeight(); x++ ) {
      t.assertNull( "initial board empty, pos " + y + ":" + y, tetris.getColor( y, x ) );
    }
  }

});

t.test( "initial tetris", () => {

  t.assertEqual( "initially no points", 0, tetris.getPoints() );
  t.assertEqual( "initially no moves", 0, tetris.getMoves() );

});

t.logSummary();


