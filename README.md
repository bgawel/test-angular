test-angular
============

Testing AngularJS application with Jasmine, Karma and Protractor.

Overview
--------
* This project demonstrates how to test AngularJS application with unit and e2e tests.
* Unit tests are run by Karma, e2e tests by Protractor.
* Unit tests are written in two versions: with $httpBackend mock and with manually mocked endpoints.
* E2E tests are also written in two versions: without any mocks and with manually mocked endpoints.

How to run unit tests
---------------------
* grunt test:unit

How to run e2e tests
--------------------
* node_modules/protractor/bin/webdriver-manager start
* grunt serve 
* grunt test:e2e