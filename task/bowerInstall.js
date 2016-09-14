var grunt = require('grunt'),
    path = require('path'),
    shelljs = require('shelljs');
module.exports = function() {
    'use strict';

    var input = grunt.file.expand({
        filter: 'isFile'
    }, ['./front_end/**/bower.json']);
    console.log(input);
    var root = process.cwd();
    input.forEach(function(n) {
        var dirname = path.dirname(n);
        shelljs.cd(root);
        shelljs.cd(dirname);
        shelljs.exec('bower install');
    });
};
