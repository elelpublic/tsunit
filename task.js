exports.setup = function( project ) {

  project.name = "tsunit";
  project.description = "A unit test environment for typescript and javascript";
  project.defaultTask = "build";

  project.tasks[ "build" ] = {
    description: "Build the project, create distribution files.",
    depends: [ "test" ],
    code: function( tsb ) {}
  };

  project.tasks[ "compile" ] = {
    description: "Compile main source files.",
    depends: [],
    internal: true,
    code: function( tsb ) {
      tsb.tsc({
        file: "src/*.ts",
        targetDir: "target"
      });
    }
  };

  project.tasks[ "clean" ] = {
    description: "Delete all artifactes which will be created by this project.",
    depends: [],
    code: function( tsb ) {
      tsb.rmdir({ dir: "target" });
    }
  }

  project.tasks[ "test" ] = {
    description: "Run unit tests which test this project.",
    depends: [ "compileTests" ],
    code: function( tsb ) {
      tsb.test({
        file: "target/tests/tests.js"
      })      
    }
  };

  project.tasks[ "compileTests" ] = {
    description: "Compile unit tests.",
    depends: [ "compile" ],
    internal: true,
    code: function( tsb ) {
      tsb.tsc({
        file: "src/tests/tests.ts",
        targetDir: "target"
      })      
    }
  };

  project.tasks[ "samples" ] = {
    description: "Run sample unit tests.",
    depends: [ "compileSamples" ],
    code: function( tsb ) {
      tsb.node({
        file: "target/samples/sampletest.js"
      })      
      tsb.node({
        file: "target/samples/tetris/tetristest.js"
      })      
    }
  }

  project.tasks[ "compileSamples" ] = {
    description: "Compile sample unit tests.",
    depends: [ "compile" ],
    internal: true,
    code: function( tsb ) {
      tsb.tsc({
        file: "src/samples/*.ts src/samples/tetris/*.ts",
        targetDir: "target"
      })      
    }
  }


}
