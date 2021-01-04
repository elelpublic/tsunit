exports.setup = function( project ) {

  project.name = "tsunit";
  project.description = "A unit test environment for typescript and javascript";
  project.defaultTarget = "build";

  project.targets[ "build" ] = {
    description: "Build the project, create distribution files.",
    depends: [ "test" ],
    code: function( bee ) {}
  };

  project.targets[ "compile" ] = {
    description: "Compile main source files.",
    depends: [],
    internal: true,
    code: function( bee ) {
      bee.tsc.run({
        file: "src/*.ts",
        targetDir: "target"
      });
    }
  };

  project.targets[ "clean" ] = {
    description: "Delete all artifactes which will be created by this project.",
    depends: [],
    code: function( bee ) {
      bee.rmdir({ dir: "target" });
    }
  }

  project.targets[ "test" ] = {
    description: "Run unit tests which test this project.",
    depends: [ "compileTests" ],
    code: function( bee ) {
      bee.test({
        file: "target/tests/tests.js"
      })      
    }
  };

  project.targets[ "compileTests" ] = {
    description: "Compile unit tests.",
    depends: [ "compile" ],
    internal: true,
    code: function( bee ) {
      bee.tsc.run({
        file: "src/tests/tests.ts",
        targetDir: "target"
      })      
    }
  };

  project.targets[ "samples" ] = {
    description: "Run sample unit tests.",
    depends: [ "compileSamples" ],
    code: function( bee ) {
      bee.node({
        file: "target/samples/sampletest.js"
      })      
      bee.node({
        file: "target/samples/tetris/tetristest.js"
      })      
    }
  }

  project.targets[ "compileSamples" ] = {
    description: "Compile sample unit tests.",
    depends: [ "compile" ],
    internal: true,
    code: function( bee ) {
      bee.tsc.run({
        file: "src/samples/*.ts src/samples/tetris/*.ts",
        targetDir: "target"
      })      
    }
  }


}
