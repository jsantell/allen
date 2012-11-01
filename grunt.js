module.exports = function(grunt) {
  
  grunt.initConfig({
    mocha: { 
      all: [ 'test/index.html' ]
    },
    coffee: {
      compile: {
        files: {
          'allen.js' : [
            './src/allen.coffee'
          ],
          'test/builtTests.js' : [
            './test/*.coffee'
          ],
          'test/mocks/mockContext.js' : [
            './test/mocks/mockContext.coffee'
          ]
        }
      }
    },
    min: {
      dist: {
        src: 'allen.js',
        dest: 'allen.min.js'
      }
    },
    watch: {
      scripts: {
        files: [
          'src/*',
          'test/*'
        ],
        tasks: 'coffee mocha min'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.registerTask('default', 'coffee mocha min');

};
