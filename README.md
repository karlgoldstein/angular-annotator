# grunt-angular-annotator

> Generates Angular declarations for Factories, Services and Controllers

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-annotator --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-annotator');
```

## The "angularAnnotate" task

### Overview

We are developing our user interface using AngularJS and CoffeeScript.  All of our source code files have the following structure:

```coffee
module = angular.module 'SomeModule', ['Module Dependency A', 'Module Dependency B']

# factory method for SomeService
SomeService = ($http, $q, AnotherOneOfOurServices) ->

  serviceMethodA: (arg1, arg2) ->
    return ...

  serviceMethodB: (arg1, arg2) ->
    return ...
  
module.service 'SomeService', ['$http', '$q', 'AnotherOneOfOurServices', SomeService]
```

The same basic pattern applies for Factory and Controller objects.

Needless to say, the need to manually keep the Angular object declaration in sync with the factory method parameters gets annoying very quickly.  If you modify the factory method arguments (add, remove or rearrange parameters) but fail to update the Angular object declaration to match, Angular does not complain.  Instead you wind up with shifted and/or undefined parameter values at runtime, accompanied by some potentially head-scratching errors.

This plugin addresses this problem by automatically inserting the
Angular object declarations as part of your Grunt build.  It modifies the
JavaScript files generated by the CoffeeScript compiler.

### Setup

In your project's Gruntfile, add a section named `angularAnnotator` to the data object passed into `grunt.initConfig()`.  The `src` property should expand to the set of JavaScript files generated by the CoffeeScript compiler:

```js
grunt.initConfig({

    coffee: {
      compile: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.coffee'],
          dest: 'tmp',
          ext: '.js'
        }]
      }
    },

    angularAnnotate: {
      postcompile: {
        src: [ 'tmp/**/*.js' ]
      }
    },
})
```

As long as you follow the conventions outlined below, you can then remove the manual `angular.factory`, `angular.service` and `angular.controller` declarations from your source code.

### Gotchas

At this point, this annotator relies on several assumptions about your CoffeeScript source code files:

  1.  Each file contains source code for a single module
  1.  The variable `module` refers to the angular module for the current file
  1.  All of your controller objects end in the suffix `Controller`
  1.  All of your service objects end in the suffix `Service`
  1.  All of your factory objects end in the suffix `Factory`
  1.  The service obtained from a factory object has the same name as the factory object, without the `Factory` suffix.

These seem like decent conventions to me, but I'm open to making it more flexible (ideally by pull request).

Note that this annotator also modifies JavaScript files in place.  This works well for modifying the output of the CoffeeScript compiler.  If you code in JavaScript, you can first copy your source files and then modify the copies in place.  I'm also open to incorporating this into the annotator by looking for an optional `dest` property.

### Options

None at this time

### Usage Examples

See the `Gruntfile.js` in the project source code for a configuration example.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

0.0.1 Initial release

