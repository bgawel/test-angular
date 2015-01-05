'use strict';

var MainPage = function() {
  this.path = '';
  
  this.at = 'Testing AngularJS application';
  
  this.content = {
    awesomeThingsArray : function() {
      return element.all(by.repeater('thing in awesomeThings'));
    },
    
    reposNamesArray : function() {
      return element.all(by.repeater('repo in repos').column('{{repo.name}}'));
    }
  };
};

module.exports = MainPage;