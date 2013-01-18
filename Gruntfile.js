/**
 * Example Gruntfile for Mocha setup
 */

'use strict';

module.exports = function(grunt) {

    var port = 8981;

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        watch: {
            // If you want to watch files and run tests automatically on change
            test: {
                files: [ 'example/js/**/*.js', 'example/test/spec/**/*.js' ],
                tasks: 'mocha'
            }
        },
        mocha: {
            // runs all html files (except test2.html) in the test dir
            // In this example, there's only one, but you can add as many as
            // you want. You can split them up into different groups here
            // ex: admin: [ 'test/admin.html' ]
            all: [ 'example/test/**/!(test2).html' ],
            
            // Runs 'test/test2.html' with specified mocha options.
            // This variant auto-includes 'bridge.js' so you do not have
            // to include it in your HTML spec file. Instead, you must add an
            // environment check before you run `mocha.run` in your HTML.
            test2: {

                // Test files
                src: [ 'example/test/test2.html' ],
                options: {
                    // mocha options
                    mocha: {
                        ignoreLeaks: false,
                        grep: 'food'
                    },

                    // Indicates whether 'mocha.run()' should be executed in 
                    // 'bridge.js'
                    run: true
                }
            },

            // Runs the same as test2 but with URL's
            test3: {

                // Test files
                options: {
                    // mocha options
                    mocha: {
                        ignoreLeaks: false,
                        grep: 'food'
                    },

                    // URLs passed through as options
                    urls: [ 'http://localhost:' + port + '/example/test/test2.html' ],

                    // Indicates whether 'mocha.run()' should be executed in 
                    // 'bridge.js'
                    run: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: port,
                    base: '.' 
                }   
            }   
        }
    });
    
    // @DEBUG Remove this line in your grunt file, this is just for testing
    grunt.loadTasks('tasks');

    // For real projects:
    // Run `npm install grunt-mocha` in project root dir and uncomment this
    // grunt.loadNpmTasks('grunt-mocha');

    // Alias 'test' to 'mocha' so you can run `grunt test`
    grunt.task.registerTask('test', ['connect', 'mocha']);
    
    // Default task.
    grunt.task.registerTask('default', 'mocha');
};
