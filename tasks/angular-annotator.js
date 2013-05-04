/*
 * grunt-angular-preprocessor
 * https://github.com/karlgoldstein/grunt-angular-preprocessor
 *
 * Copyright (c) 2013 Karl Goldstein
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');

  var INJECTABLE_RE = /\n\s*([\w]+(Controller|Service|Factory))\s*=\s*function\(([^)]*)\)/g;

  // Warn on and remove invalid source files (if nonull was set).
  var existsFilter = function(filepath) {

    if (!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
      return false;
    } else {
      return true;
    }
  };

  var quote = function(s) {
    return "'" + s.trim() + "'";
  };

  grunt.registerMultiTask('angularAnnotate', 'AngularJS annotation generator', function() {

    this.files.forEach(function(f) {

      f.src.filter(existsFilter).forEach(function(filepath) {

        var injectables = [], declarations = [];
        var content = grunt.file.read(filepath);
        var output = content.replace(INJECTABLE_RE, function(match, name, type, args) {
          var injectableName = name.replace(/Factory$/, '');
          injectables.push(injectableName);
          var dependencies = args.split(',').map(quote).join(',');
          declarations.push("module." + type.toLowerCase() + "('" + injectableName + "', [" + dependencies + ", " + name + "]);");
          return match;
        });
        if (injectables.length > 0) {
          output = output.replace(/}\).call\(this\);\s*$/, declarations.join("\n") + "\n$&");
          grunt.file.write(filepath, output);
          grunt.log.writeln('Appended Angular declarations to ' + filepath + ' for injectables: ' + injectables.join(', '));
        }
      });
    });
  });
};
