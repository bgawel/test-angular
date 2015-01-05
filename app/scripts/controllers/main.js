'use strict';

angular.module('testAngularApp')
  .controller('MainCtrl', ['$scope', 'backend', function ($scope, backend) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Protractor'
    ];
    
    backend.getAllGithubRepos('bgawel').then(function(repos) {
      $scope.repos = repos;
    });
  }]);
