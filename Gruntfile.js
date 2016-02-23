/* global require, module*/

'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});

module.exports = function (grunt) {

    // configurable paths
    var config = {
        app: 'src',
        dev: 'dev',
        dist: 'dist',
        tmp: '.tmp'
    };

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // individual grunt task files
    // require('load-grunt-config')(grunt);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,

        /**
         * grunt-assemble
         * https://github.com/assemble/grunt-assemble
         */
        assemble: {
            options: {
                layoutdir: '<%= config.app %>/templates/layouts',
                partials: '<%= config.app %>/templates/partials/**/*.hbs',
                flatten: true
            },
            dev: {
                options: {
                    layout: 'default.hbs'
                },
                files: {
                    '<%= config.dev %>/': ['<%= config.app %>/templates/pages/*.hbs']
                }
            },
            dist: {
                options: {
                    layout: 'default.hbs'
                },
                files: {
                    '<%= config.dist %>/': ['<%= config.app %>/templates/pages/*.hbs']
                }
            }
            // pattern: {
            //     options: {
            //         layout: 'patterns.hbs'
            //     },
            //     files: {
            //         '<%= config.dist %>/': ['<%= config.app %>/templates/pages/patterns.hbs']
            //     }
            // }
        },

        /**
         * grunt-babel
         * https://github.com/babel/grunt-babel
         */
        babel: {
            options: {
                sourceMap: true
            },
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.tmp %>/scripts/',
                    src: [
                        'scripts/**/*.js',
                        '!scripts/libs/*',
                        '!scripts/compiled/*'
                    ],
                    flatten: true
                }]
                // files: {
                //     '<%= config.dist %>/includes/jsbin/<%= pkg.name %>.min.js': '<%= config.dist %>/includes/jsbin/<%= pkg.name %>.min.js'
                // }
            }
        },

        /**
         * grunt-contrib-clean
         * https://github.com/gruntjs/grunt-contrib-clean
         */
        clean: {
            dev: ['<%= config.tmp %>', '<%= config.dev %>'],
            dist: ['<%= config.dist %>']
        },

        /**
         * grunt-contrib-concat
         * https://github.com/gruntjs/grunt-contrib-concat
         */
        concat: {
            options: {},
            custom: {
                options: {
                    sourceMap: true
                },
                files: {
                    '<%= config.dist %>/scripts/<%= pkg.name %>.min.js': [
                        '<%= config.app %>/scripts/{,*/}*.js',
                        '!<%= config.app %>/scripts/libs/*',
                        '!<%= config.app %>/scripts/compiled/*'
                    ]
                }
            },
            dev: {
                files: {
                    '<%= config.dev %>/scripts/vendors.js': [
                        '<%= config.app %>/scripts/libs/*'
                    ]
                }
            },
            dist: {
                files: {
                    '<%= config.dist %>/scripts/vendors.js': [
                        '<%= config.app %>/scripts/libs/*'
                    ]
                }
            }
        },

        /**
         * grunt-contrib-connect
         * https://github.com/gruntjs/grunt-contrib-connect
         */
        connect: {
            options: {
                port: 9001,
                hostname: '0.0.0.0',
                livereload: true
            },
            dev: {
                options: {
                    // serve files from both the app and tmp folders
                    base: ['<%= config.dev %>', '<%= config.app %>'],
                    open: {
                        target: 'http://localhost:<%= connect.options.port %>'
                    }
                }
            },
            dist: {
                options: {
                    // serve files from both the app and tmp folders
                    base: ['<%= config.dist %>', '<%= config.tmp %>'],
                    open: {
                        target: 'http://localhost:<%= connect.options.port %>?envMode=apiary&testing=true'
                    }
                }
            }
        },

        /**
         * grunt-concurrent
         * https://github.com/sindresorhus/grunt-concurrent
         */
        concurrent: {
            build: ['assemble', 'sass']
        },

        /**
         * grunt-contrib-copy
         * https://github.com/gruntjs/grunt-contrib-copy
         */
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: ['fonts/*']
                }]
            }
        },

        /**
         * grunt-eslint
         * https://github.com/sindresorhus/grunt-eslint
         */
        eslint: {
            target: [
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/libs/*',
                '!<%= config.app %>/scripts/compiled/*'
            ]
        },

        /**
         * grunt-contrib-imagemin
         * https://github.com/gruntjs/grunt-contrib-imagemin
         */
        imagemin: {
            jpg: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/media',
                    src: ['**/*.jpg'],
                    dest: '<%= config.dist %>/media'
                }]
            },
            png: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/media',
                    src: ['**/*.png'],
                    dest: '<%= config.dist %>/media'
                }]
            },
            svg: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/media/svg',
                    src: ['*.svg'],
                    dest: '<%= config.dist %>/media/svg'
                }]
            }
        },

        /**
         * grunt-jsdoc
         * https://github.com/krampstudio/grunt-jsdoc
         */
        jsdoc: {
            docs: {
                options: {
                    destination: './jsdocs',
                    configure: './conf.json',
                    template: './node_modules/ink-docstrap/template',
                    private: true
                },
                src: [
                    '<%= config.app %>/scripts/{,*/}*.js',
                    '!<%= config.app %>/scripts/libs/*',
                    '!<%= config.app %>/scripts/compiled/*'
                ]
            }
        },

        /**
         * grunt-postcss
         * https://github.com/nDmitry/grunt-postcss
         */
        postcss: {
            dev: {
                options: {
                    map: {
                        inline: false
                    },
                    processors: [
                        require('autoprefixer-core')({
                            browsers: ['last 2 version', 'ie 9']
                        }),
                        require('cssnano')()
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>/css',
                    src: ['*.css'],
                    dest: '<%= config.dev %>/css'
                }]
            },
            dist: {
                options: {
                    map: {
                        inline: false
                    },
                    processors: [
                        require('autoprefixer-core')({browsers: ['last 2 version', 'ie 9']}),
                        require('cssnano')({
                            zindex: 0
                        })
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>/css',
                    src: ['*.css'],
                    dest: '<%= config.dist %>/css'
                }]
            }
        },

        /**
         * grunt-processhtml
         * https://github.com/dciccale/grunt-processhtml
         */
        processhtml: {

        },

        replace: {
            sourceMap: {
                options: {
                    patterns: [{
                        match: 'src/',
                        replacement: '/'
                    }, {
                        match: '../../src/',
                        replacement: '/'
                    }],
                    usePrefix: false
                },
                files: {
                    '<%= config.dev %>/scripts/first_third.js.map': ['<%= config.dev %>/scripts/first_third.js.map'],
                    '<%= config.dev %>/css/first_third.css.map': ['<%= config.dev %>/css/first_third.css.map']
                }
            }
        },

        /**
         * grunt-sass
         * https://github.com/sindresorhus/grunt-sass
         */
        sass: {
            options: {
                sourceMap: true
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/sass/',
                    src: ['*.scss'],
                    dest: '<%= config.tmp %>/css/',
                    ext: '.css'
                }]
            }
        },

        /**
         * grunt-sassdoc - create documentation for sass files
         * https://github.com/SassDoc/grunt-sassdoc
         */
        sassdoc: {
            all: {
                options: {
                    dest: './sassdoc',
                    groups: {
                        fonts: 'Fonts',
                        colors: 'Colors',
                        buttons: 'Buttons',
                        ui: 'UI'
                    }
                },
                src: '<%= config.app %>/sass/'
            }
        },

        /**
         * grunt-sass-globbing
         * https://github.com/DennisBecker/grunt-sass-globbing
         */
        sass_globbing: {
            all: {
                files: {
                    '<%= config.app %>/sass/_modulesMap.scss': '<%= config.app %>/sass/modules/**/*.scss',
                    '<%= config.app %>/sass/_uiMap.scss': '<%= config.app %>/sass/ui/**/*.scss',
                    '<%= config.app %>/sass/_layoutsMap.scss': '<%= config.app %>/sass/layouts/**/*.scss'
                }
            }
        },

        /**
         * grunt-contrib-uflify
         * https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            options: {
                screwIE8: true
            },
            dev: {
                options: {
                    beautify: true,
                    mangle: false,
                    compress: false,
                    sourceMap: true,
                    screwIE8: true
                },
                files: {
                    '<%= config.dev %>/scripts/<%= pkg.name %>.js': [
                        '<%= config.tmp %>/scripts/{,*/}*.js',
                        '!<%= config.app %>/scripts/libs/*',
                        '!<%= config.app %>/scripts/compiled/*'
                    ]
                }
            },
            dist: {
                options: {
                    sourceMap: true,
                    preserveComments: false,
                    screwIE8: true
                },
                // files: [{
                //     expand: true,
                //     cwd: '<%= config.tmp %>/includes/jsbin',
                //     dest: '<%= config.dist %>',
                //     src: ['*.js']
                // }]
                files: {
                    '<%= config.dist %>/scripts/<%= pkg.name %>.min.js': [
                        '<%= config.tmp %>/scripts/*.js'
                    ]
                }
            }
        },

        /**
         * grunt-contrib-watch
         * https://github.com/gruntjs/grunt-contrib-watch
         */
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: [
                    '<%= config.app %>/sass/**/*.scss',
                ],
                tasks: ['sass_globbing', 'sass:dev', 'postcss:dev']
            },
            scripts: {
                files: [
                    '<%= config.app %>/scripts/{,*/}*.js',
                    '!<%= config.app %>/scripts/compiled/*'
                ],
                tasks: ['eslint', 'babel', 'uglify:dev']
            },
            assemble: {
                files: [
                    '<%= config.app %>/templates/**/*.hbs'
                ],
                tasks: ['assemble:dev']
            }
        }
    });

    /***** dev task *****/
    // grunt.registerTask('dev', [
    //     'clean:dev',
    //     'sass_globbing',
    //     'sass:dev',
    //     'postcss:dev',
    //     'eslint',
    //     // 'uglify:dev',
    //     'concat',
    //     'babel',
    //     'connect:server',
    //     'watch'
    // ]);

    grunt.registerTask('serve', 'Run the build task and start a server', function (target) {
        grunt.task.run([
            'clean',
            'assemble:dev',
            'sass_globbing',
            'sass:dev',
            'postcss:dev',
            'imagemin',
            'copy',
            'eslint',
            'concat:dev',
            'babel',
            'uglify:dev',
            'replace:sourceMap',
            'connect:dev',
            'watch'
        ]);
    });

    grunt.registerTask('build', 'Assemble the pages and compile assets', function (target) {
        grunt.task.run([
            'clean',
            'assemble:dist',
            'sass_globbing',
            'sass:dev',
            'postcss:dist',
            'imagemin',
            'copy',
            'eslint',
            'concat:dist',
            'babel',
            'uglify:dist'
        ]);
    });

    grunt.registerTask('default', []);
};
