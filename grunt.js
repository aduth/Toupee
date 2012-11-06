module.exports = function(grunt) {

    grunt.initConfig({

        clean: ['dist/'],

        jst: {
            'dist/debug/templates.js': [
                'js/templates/*.html'
            ]
        },

        concat: {
            'dist/debug/require.js': [
                'js/vendor/require/almond.js',
                'dist/debug/templates.js',
                'dist/debug/require.js'
            ]
        },

        min: {
            'dist/release/require.js': [
                'dist/debug/require.js'
            ]
        },

        requirejs: {
            mainConfigFile: 'js/config.js',
            out: 'dist/debug/require.js',
            name: 'config',
            wrap: false
        },

        mincss: {
            'dist/release/index.css': ['dist/debug/index.css']
        },

        styles: {
            'dist/debug/index.css': {
                src: 'assets/css/index.css'
            }
        },

        server: {
            base: '.',

            debug: {
                folders: {
                    'js': 'dist/debug',
                    'js/vendor/require': 'dist/debug'
                }
            },
            release: {
                folders: {
                    'js': 'dist/release',
                    'js/vendor/require': 'dist/release',
                    'assets/css': 'dist/release',
                    'assets/css/images': 'assets/css/vendor/jquery-ui/images'
                }
            }
        }

    });

    grunt.registerTask('debug', 'clean jst requirejs concat styles');
    grunt.registerTask('release', 'debug min mincss');

};