'use strict';

describe('Controller: MainCtrl with $httpBackend mock', function () {

  // load the controller's module
  beforeEach(module('testAngularApp'));

  var scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $controller('MainCtrl', { $scope: scope });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings).toEqual(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Protractor']);
  });
  
  it('should attach a list of repos to the scope', function () {
    var expectedRepos = [{'id': 1, 'name': 'repo1'}, {'id': 2, 'name': 'repo2'}];
    $httpBackend.expectGET('https://api.github.com/users/bgawel/repos').respond(expectedRepos);
    $httpBackend.flush();
    
    expect(scope.repos).toEqual(expectedRepos);
  });
});

describe('Controller: MainCtrl with mocked endpoints', function () {

  // load the controller's module
  beforeEach(module('testAngularApp'));

  var rootScope, scope, endpointRepos;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, endpoints, $q) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    endpointRepos = $q.defer();
    spyOn(endpoints, 'repos').and.callFake(function(username) {
      expect(username).toBe('bgawel');
      return endpointRepos.promise;
    });
    $controller('MainCtrl', { $scope: scope });
  }));
  
  it('should attach a list of repos to the scope', function () {
    var expectedRepos = [{'id': 1, 'name': 'repo1'}, {'id': 2, 'name': 'repo2'}];
    endpointRepos.resolve({data: expectedRepos});
    rootScope.$apply(); // propagate promise resolution to 'then'
    
    expect(scope.repos).toEqual(expectedRepos);
  });
});
