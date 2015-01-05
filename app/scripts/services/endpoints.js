'use strict';

var endpointsModule = angular.module('endpoints-testAngularApp', []);

endpointsModule.factory('endpoints', ['$http', function($http) {
  return {
    repos : function(username) {
      return $http.get('https://api.github.com/users/' + username + '/repos');
    }
  };
}]);