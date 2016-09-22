module.exports = function (grunt) {

    'use strict';
    var configParams = require("./config.json");
    var project = {
        paths: {
            get config() {
                return this.grunt + 'config/';
            },
            get tasks() {
                return this.grunt + 'tasks/';
            },
            dist: 'dist/',
            doc: 'doc/',
            grunt: 'grunt/',
            tmp: '.tmp/',
            reports: './reports'
        },

        files: {
            get config() {
                return project.paths.config + '*.js';
            },
            grunt: 'Gruntfile.js',
            test: ['components/**/test/specs/**/*.js']
        },

        rpm_post_install_file: 'post-install.sh',
        rpm_unzip_dest: configParams.pkgmainpath,
        pkg: grunt.file.readJSON('package.json'),
        gitPrefix: configParams.gitPrefix,
        componentPrefix: configParams.componentPrefix,
        componentsFolder: configParams.componentsFolder,
        //grunt dynamic parameter can not work with initConfig in function
        //For local testing, mostly we don't have multi browsers
        //For CI, mosty we are using headless browsers.
        //We hardcoded two arbitrary folder names here and
        //use grunt copy to rename generated reports to specific names
        //https://github.com/karma-runner/karma-coverage/pull/62
        chromeAgentInfo: 'Chrome',
        phantomJSAgentInfo: 'PhantomJS'
    };
    grunt.registerTask('bowerInstall', require("./task/bowerInstall.js"));
};
