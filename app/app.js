'use strict';
const CONTROLLER_VIEW_MODEL_NAME = 'vm';

var angular = require('angular');
require('angular-route');
require('angular-material');

function configure(c) {
	// Configure a dark theme with primary foreground yellow
	$mdThemingProvider
		.theme('docs-dark', 'default')
		.primaryPalette('yellow')
		.dark()
		.foregroundPalette['3'] = 'yellow';
};

var app = angular.module('myOnotes', ['ngRoute', 'ngMaterial', 'ngAnimate', 'angularInlineEdit']);

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
			templateUrl: './templates/notes.html',
			controller: 'notesController',
			controllerAs: CONTROLLER_VIEW_MODEL_NAME
		})
		.when('/note-info/:noteId', {
			templateUrl: './templates/note-info.html',
			controller: 'noteInfoController',
			controllerAs: CONTROLLER_VIEW_MODEL_NAME
		})
		.otherwise({ redirectTo: '/' });
}]);