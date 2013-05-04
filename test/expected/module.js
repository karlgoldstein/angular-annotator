(function() {
  var TestController, TestFactory, TestService, module;

  module = angular.module('TestModule', []);

  TestFactory = function($http, $q, MyService) {};

  TestService = function($window, $document, $filter) {};

  TestController = function($http, $location) {};

module.factory('Test', ['$http','$q','MyService', TestFactory]);
module.service('TestService', ['$window','$document','$filter', TestService]);
module.controller('TestController', ['$http','$location', TestController]);
}).call(this);
