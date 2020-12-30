exports.setup = function( project ) {

  project.name = "tsunit";
  project.description = "A unit test environment for typescript and javascript";
  project.defaultTask = "build";

  project.tasks[ "build" ] = {
    description: "Build the project, create distribution files.",
    depends: [ "test" ],
    code: function( tsb ) {
      tsb.tsc({
        file: "*.ts"
      });
    }
  };

  project.tasks[ "test" ] = {
    description: "Run unit tests",
    depends: [ "compileTests" ],
    code: function( tsb ) {
      tsb.test({
        file: "tests/tests.js"
      })      
    }
  };

  project.tasks[ "compileTests" ] = {
    description: "Compile unit tests",
    depends: [],
    code: function( tsb ) {
      tsb.tsc({
        file: "tests/tests.ts"
      })      
    }
  };

}
