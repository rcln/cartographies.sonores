module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jquery-colorbox/jquery.colorbox.js',
            'bower_components/jquery-colorbox/i18n/jquery.colorbox-fr.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/react/react.js',
            'bower_components/react-router/build/umd/ReactRouter.js',
            'bower_components/immutable/dist/immutable.js',
            'bower_components/leaflet/dist/leaflet.js',
            'bower_components/eventEmitter/EventEmitter.js',
            'bower_components/marked/lib/marked.js'

        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    babel: {
        options: {
            sourceMap: true,
            nonStandard: true
        },
        dist: {
          expand: true,     // Enable dynamic expansion.
          cwd: 'src/',      // Src matches are relative to this path.
          src: ['*.js'], // Actual pattern(s) to match.
          dest: 'public/js/',   // Destination path prefix.
          ext: '.js',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
        }
    },

    watch: {
        foo: {
            files: 'src/*',
            tasks: ['babel'],
            options: {
                spawn: false
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['concat', 'uglify']);
};
