'use strict';

var app = angular.module('testAngularApp');

app.factory('backend', ['endpoints', function(endpoints) {
  return {
    getAllGithubRepos : function(username) {
      return endpoints.repos(username).then(function(result) {
        console.log('Retrieved repos:', result.data);
        return result.data;
      });
    }
  };
}]);