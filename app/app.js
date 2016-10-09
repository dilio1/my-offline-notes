'use strict';
const CONTROLLER_VIEW_MODEL_NAME = 'vm';

var angular = require('angular');
require('angular-route');
require('angular-material');
// require('./notes-controller');

function configure(c) {
	// Configure a dark theme with primary foreground yellow
	$mdThemingProvider
		.theme('docs-dark', 'default')
		.primaryPalette('yellow')
		.dark()
		.foregroundPalette['3'] = 'yellow';
};

var app = angular.module('myOnotes', ['ngRoute', 'ngMaterial', 'ngAnimate']);

app.config(['$routeProvider', '$mdThemingProvider', function ($routeProvider, $mdThemingProvider) {
	// $mdThemingProvider
	// 	.theme('docs-dark', 'default')
	// 	.primaryPalette('yellow')
	// 	.dark()
	// 	.foregroundPalette['3'] = 'yellow';

		$mdThemingProvider
		.theme('indigo', 'default')
		.primaryPalette('pink')
		.dark()
    .accentPalette('orange');

	$routeProvider
		.when('/', {
			templateUrl: 'partials/identity/register.html',
			controller: 'notesController',
			controllerAs: CONTROLLER_VIEW_MODEL_NAME
		})
		.otherwise({ redirectTo: '/' });

}]);