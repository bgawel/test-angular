'use strict';

describe('main page: full e2e tests', function() {
  
  var Q = require('q');
  var MainPage = require('../pages/main.page.js');
  var page = new MainPage();
  var pc = page.content;
  
  beforeEach(function() {
    browser.driver.manage().window().maximize();
    browser.get('http://localhost:9000/' + page.path);
  });
  
  it('should load main page', function() {
    expect(browser.getTitle()).toEqual(page.at);
  });
  
  it('should display a list of awesome things', function () {
    var awesomeThings = pc.awesomeThingsArray();

    expect(awesomeThings.count()).toBe(4);
    expect(awesomeThings.last().getText()).toBe('Protractor');
  });
  
  it('should retrieve a repo where this project is stored', function() {
    var repos = pc.reposNamesArray();

    expect(repos.count()).toBeGreaterThan(0);
    repos.count().then(function(count) {
      var reposNames = [];
      for (var i = 0; i < count; ++i) {
        reposNames.push(repos.get(i).getText());
      }
      Q.all(reposNames).done(function(result) {
        for (var i = 0; i < count; ++i) {
          if (result[i] === 'test-angular') {
            break;
          }
        }
        expect(i).toBeLessThan(count);
      });
    });
  });
  
});

describe('main page: mocked endpoints', function() {
  
  var Q = require('q');
  var MainPage = require('../pages/main.page.js');
  var page = new MainPage();
  var pc = page.content;
  
  beforeEach(function() {
    browser.driver.manage().window().maximize();
    browser.addMockModule('endpoints-testAngularApp', function() {
      angular.module('endpoints-testAngularApp', []).factory('endpoints', function($q) {
        return {
          repos : function(username) {
            return $q.when({ data : [{'id': 1, 'name': 'repo1'}, {'id': 2, 'name': 'repo2'}] });
          }
        };
      })
    });
    browser.get('http://localhost:9000/' + page.path);
  });
  
  it('should retrieve a repo where this project is stored', function() {
    var repos = pc.reposNamesArray();

    expect(repos.count()).toBeGreaterThan(0);
    repos.count().then(function(count) {
      var reposNames = [];
      for (var i = 0; i < count; ++i) {
        reposNames.push(repos.get(i).getText());
      }
      Q.all(reposNames).done(function(result) {
        for (var i = 0; i < count; ++i) {
          if (result[i] === 'repo2') {
            break;
          }
        }
        expect(i).toBeLessThan(count);
      });
    });
  });
  
});