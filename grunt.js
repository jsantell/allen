module.exports = function(grunt) {
  
  grunt.initConfig({
    mocha: { 
      specs: {
        src: [ 'specs/index.html' ],
        mocha: {}
      }
    },
    coffee: {
      compile: {
        files: {
          'allen.js' : [
            './src/allen.coffee'
          ],
          'specs/builtTests.js' : [
            './specs/*.coffee'
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
          'specs/*'
        ],
        tasks: 'coffee mocha min'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.registerTask('default', 'coffee mocha min');

};
