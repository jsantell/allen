module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */'
    },
    mocha: { 
      all: [ 'test/index.html' ]
    },
    concat: {
      dev: {
        src: [ '<banner:meta.banner>', 'allen.js' ],
        dest: 'allen.js'
      },
      prod: {
        src: [ '<banner:meta.banner>', 'allen.min.js' ],
        dest: 'allen.min.js'
      }
    },
    coffee: {
      compile: {
        files: {
          'allen.js' : [
            './src/allen.coffee'
          ],
          'test/build/specs.js' : [
            './test/*.coffee'
          ],
          'test/build/mockContext.js' : [
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
          'test/*.coffee',
          'test/mocks/*.coffee'
        ],
        tasks: 'coffee mocha min'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.registerTask('default', 'coffee min concat mocha');
  grunt.registerTask('build', 'coffee min concat');
  grunt.registerTask('test', 'mocha');

};
