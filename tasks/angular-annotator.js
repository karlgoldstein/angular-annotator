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

  var INJECTABLE_RE = /\n\s*([\w]+(Directive|Controller|Service|Factory|Config|Run))\s*=\s*function\(([^)]*)\)/g;

  // TODO: also match XXXService.constructor = function(XXX) {};

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

  grunt.registerMultiTask('angular', 'AngularJS preprocessor', function() {

    this.files.forEach(function(f) {

      f.src.filter(existsFilter).forEach(function(filepath) {

        var injectables = [], declarations = [];
        var content = grunt.file.read(filepath);
        var output = content.replace(INJECTABLE_RE, function(match, name, type, args) {
          var injectableName = name.replace(/(Directive|Factory)$/, '');
          injectables.push(injectableName);
          var dependencies = args.split(',');
          if (dependencies.length > 0 && dependencies[0] != '') {
            dependencies = dependencies.map(quote).join(',') + ", ";
          } else {
            dependencies = "";
          }
          if (type.toLowerCase() == "config" || type.toLowerCase() == "run") {
            declarations.push("module." + type.toLowerCase() + "([" + dependencies + name + "]);");
          } else {
            declarations.push("module." + type.toLowerCase() + "('" + injectableName + "', [" + dependencies + name + "]);");
          }
          return match;
        });
        if (injectables.length > 0) {
          output = output.replace(/}\).call\(this\);\s*$/, declarations.join("\n") + "\n$&");
          grunt.file.write(filepath, output);
          grunt.log.writeln('Inserted declarations in ' + filepath + ': ' + injectables.join(','));
        }
      });
    });
  });
};
