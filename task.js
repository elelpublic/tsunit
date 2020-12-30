exports.setup = function( project ) {

  project.name = "tsunit";
  project.description = "A unit test environment for typescript and javascript";
  project.defaultTask = "build";

  project.tasks["build"] = {
    description: "Build the project, create distribution files.",
    depends: [ "test" ],
    code: build
  };

  project.tasks["test"] = {
    description: "Run unit tests",
    depends: [],
    code: test
  };

}

function build( tsb ) {

  tsb.tsc({
    file: "*.ts"
  });

  //tsb.exec( "tsc *.ts" );
  // tsc *.ts
  // tsc samples/*.ts
  // tsc tests/*.ts
  // tsc samples/tetris/*.ts
  
}

function test() {
  console.log( "Hello test" );
}

